// Sunucu önce npm start ile başlatılmış olmalıdır.
const assert = require('node:assert/strict');
const base = process.env.API_BASE_URL || 'http://localhost:3000';
async function call(method, url, payload) {
  const response = await fetch(`${base}${url}`, {
    method,
    headers: payload ? { 'Content-Type': 'application/json' } : {},
    body: payload ? JSON.stringify(payload) : undefined
  });
  const text = await response.text();
  return { status: response.status, body: text ? JSON.parse(text) : null };
}
(async () => {
  let id;
  try {
    let r = await call('GET', '/health'); assert.equal(r.status, 200);
    r = await call('POST', '/gaps', { title: 'Smoke test kaydı', description: 'HTTP zincir kontrolü', priority: 'high', assignee: 'Test' });
    assert.equal(r.status, 201); id = r.body.data.id;
    r = await call('GET', '/gaps'); assert.equal(r.status, 200); assert.ok(r.body.pagination.total >= 1);
    r = await call('GET', `/gaps/${id}`); assert.equal(r.status, 200);
    r = await call('PUT', `/gaps/${id}`, { status: 'resolved' }); assert.equal(r.status, 200);
    r = await call('GET', '/reports/summary'); assert.equal(r.status, 200);
    r = await call('POST', '/gaps', { title: '' }); assert.equal(r.status, 400);
    r = await call('DELETE', `/gaps/${id}`); assert.equal(r.status, 204); id = undefined;
    console.log('HTTP smoke: 8 kontrol başarılı.');
  } catch (error) {
    console.error('HTTP smoke BAŞARISIZ:', error.message);
    process.exitCode = 1;
  } finally {
    if (id) await call('DELETE', `/gaps/${id}`).catch(() => {});
  }
})();
