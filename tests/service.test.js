const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const service = require('../src/services/gapService');
const { validatePayload } = require('../src/middleware/validateGap');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'signalgap-unit-'));
process.env.DATA_FILE = path.join(tmp, 'gaps.json');

test('CRUD: oluştur, listele, detay, güncelle ve sil', () => {
  const body = { title: 'Yedek doğrulama', description: 'Geri yükleme testi yok', priority: 'high', assignee: 'Ece' };
  validatePayload(body);
  const created = service.create(body);
  assert.equal(created.id, 1);
  assert.equal(created.status, 'discovered');
  assert.equal(service.list().pagination.total, 1);
  assert.equal(service.getById(1).title, body.title);
  validatePayload({ status: 'resolved', resolution: 'Test yapıldı' }, true);
  const updated = service.update(1, { status: 'resolved', resolution: 'Test yapıldı' });
  assert.equal(updated.status, 'resolved');
  assert.equal(service.report().completed, 1);
  service.remove(1);
  assert.equal(service.list().pagination.total, 0);
  assert.throws(() => service.getById(1), { status: 404 });
});

test('filtreleme, arama, pagination, raporlama', () => {
  const base = { description: 'Açıklama', priority: 'low', assignee: 'Ayşe' };
  service.create({ ...base, title: 'Ödeme API kontrolü', status: 'investigating', riskLevel: 'high' });
  service.create({ ...base, title: 'Bildirim servisi', status: 'accepted-risk', riskLevel: 'medium' });
  assert.equal(service.list({ status: 'investigating' }).pagination.total, 1);
  assert.equal(service.list({ keyword: 'ödeme' }).pagination.total, 1);
  assert.equal(service.list({ page: '2', limit: '1' }).data.length, 1);
  assert.equal(service.report().highRiskOpen, 1);
  assert.equal(service.report().completed, 1);
  assert.equal(service.report().pending, 1);
});

test('geçersiz veri ve olmayan id için anlamlı hatalar', () => {
  assert.throws(() => validatePayload({ title: '', description: 'x', priority: 'high', assignee: 'A' }), { status: 400 });
  assert.throws(() => validatePayload({ title: 'x', description: 'x', priority: 'ultra', assignee: 'A' }), { status: 400 });
  assert.throws(() => validatePayload({ title: 'x', description: 'x', priority: 'high', assignee: 'A', id: 12 }), { status: 400 });
  assert.throws(() => service.list({ page: -1 }), { status: 400 });
  assert.throws(() => service.getById('abc'), { status: 400 });
  assert.throws(() => service.getById(999), { status: 404 });
});

test.after(() => {
  delete process.env.DATA_FILE;
  fs.rmSync(tmp, { recursive: true, force: true });
});
