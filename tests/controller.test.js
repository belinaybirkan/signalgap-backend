const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const controller = require('../src/controllers/gapController');
const reports = require('../src/controllers/reportController');
const logger = require('../src/middleware/logger');
const { validateCreate } = require('../src/middleware/validateGap');

function mockResponse() {
  return {
    statusCode: 200,
    status(n) { this.statusCode = n; return this; },
    json(payload) { this.body = payload; return this; },
    end() { this.ended = true; return this; }
  };
}

test('controller temel CRUD yanıt kodları ve rapor', () => {
  const prev = process.env.DATA_FILE;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'signalgap-controller-'));
  process.env.DATA_FILE = path.join(dir, 'data.json');
  try {
    let res = mockResponse();
    controller.create({ body: { title: 'Kritik risk', description: 'Yedek denetimi', assignee: 'Deniz', priority: 'high' } }, res);
    assert.equal(res.statusCode, 201);
    const id = res.body.data.id;
    res = mockResponse(); controller.getAll({ query: {} }, res);
    assert.equal(res.body.data.length, 1);
    res = mockResponse(); controller.getOne({ params: { id } }, res);
    assert.equal(res.body.data.title, 'Kritik risk');
    res = mockResponse(); controller.update({ params: { id }, body: { status: 'resolved' } }, res);
    assert.equal(res.body.data.status, 'resolved');
    res = mockResponse(); reports.summary({}, res);
    assert.equal(res.body.data.completed, 1);
    res = mockResponse(); controller.remove({ params: { id } }, res);
    assert.equal(res.statusCode, 204);
    assert.equal(res.ended, true);
  } finally {
    if (prev === undefined) delete process.env.DATA_FILE; else process.env.DATA_FILE = prev;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('validation middleware geçerli/gereksiz body davranışı', () => {
  let forwarded;
  validateCreate({ body: { title: 'deneme', description: 'a', assignee: 'Deniz', priority: 'high' } }, {}, err => { forwarded = err || null; });
  assert.equal(forwarded, null);
  validateCreate({ body: { title: 'deneme' } }, {}, err => { forwarded = err; });
  assert.equal(forwarded.status, 400);
});

test('logger method, URL ve zaman bilgisini loglar', () => {
  const logs = [];
  const old = console.log;
  console.log = message => logs.push(message);
  let called = false;
  try { logger({ method: 'GET', originalUrl: '/gaps' }, {}, () => { called = true; }); }
  finally { console.log = old; }
  assert.ok(called);
  assert.match(logs[0], /GET \/gaps/);
  assert.match(logs[0], /\d{4}-\d{2}-\d{2}T/);
});
