const { readAll, writeAll } = require('../utils/fileStore');
const HttpError = require('../utils/httpError');

const ALLOWED_STATUS = ['discovered', 'investigating', 'verified', 'resolved', 'accepted-risk'];
const ALLOWED_LEVELS = ['low', 'medium', 'high'];
const CLOSED_STATUS = new Set(['resolved', 'accepted-risk']);
const FIELDS = ['title', 'description', 'category', 'riskLevel', 'priority', 'status', 'assignee', 'resolution'];

function getById(rawId) {
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id <= 0) throw new HttpError(400, 'Geçersiz kayıt ID.');
  const gap = readAll().find(item => item.id === id);
  if (!gap) throw new HttpError(404, 'Kör nokta kaydı bulunamadı.');
  return gap;
}

function list(query = {}) {
  let rows = readAll();
  for (const field of ['status', 'priority', 'riskLevel', 'category', 'assignee']) {
    if (query[field] !== undefined) {
      if (typeof query[field] !== 'string' || !query[field].trim()) {
        throw new HttpError(400, `${field} filtresi geçerli bir metin olmalıdır.`);
      }
      if (field === 'status' && !ALLOWED_STATUS.includes(query[field])) {
        throw new HttpError(400, 'Geçersiz status filtresi.');
      }
      if (['priority', 'riskLevel'].includes(field) && !ALLOWED_LEVELS.includes(query[field])) {
        throw new HttpError(400, `Geçersiz ${field} filtresi.`);
      }
      rows = rows.filter(item => String(item[field]).toLowerCase() === query[field].toLowerCase());
    }
  }

  if (query.keyword !== undefined) {
    if (typeof query.keyword !== 'string' || !query.keyword.trim()) {
      throw new HttpError(400, 'keyword boş olamaz.');
    }
    const text = query.keyword.toLocaleLowerCase('tr');
    rows = rows.filter(item =>
      [item.title, item.description, item.category].some(v =>
        String(v).toLocaleLowerCase('tr').includes(text))
    );
  }

  const sort = query.sort ?? 'createdAt';
  const order = query.order ?? 'desc';
  if (!['createdAt', 'updatedAt', 'title', 'priority', 'riskLevel'].includes(sort)) {
    throw new HttpError(400, 'sort alanı desteklenmiyor.');
  }
  if (!['asc', 'desc'].includes(order)) throw new HttpError(400, 'order asc veya desc olmalıdır.');

  const levels = { low: 1, medium: 2, high: 3 };
  rows = [...rows].sort((a, b) => {
    const first = ['priority', 'riskLevel'].includes(sort) ? levels[a[sort]] : a[sort];
    const second = ['priority', 'riskLevel'].includes(sort) ? levels[b[sort]] : b[sort];
    const result = typeof first === 'number' ? first - second : String(first).localeCompare(String(second), 'tr');
    return result * (order === 'asc' ? 1 : -1);
  });

  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  if (!Number.isSafeInteger(page) || page < 1) throw new HttpError(400, 'page pozitif tam sayı olmalıdır.');
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new HttpError(400, 'limit 1-100 arasında tam sayı olmalıdır.');
  return {
    data: rows.slice((page - 1) * limit, page * limit),
    pagination: { page, limit, total: rows.length, totalPages: Math.ceil(rows.length / limit) }
  };
}

function create(payload) {
  const items = readAll();
  const now = new Date().toISOString();
  const id = Math.max(0, ...items.map(item => item.id)) + 1;
  const gap = {
    id,
    title: payload.title.trim(),
    description: payload.description.trim(),
    category: (payload.category ?? 'general').trim(),
    riskLevel: payload.riskLevel ?? 'medium',
    priority: payload.priority,
    status: payload.status ?? 'discovered',
    assignee: payload.assignee.trim(),
    resolution: (payload.resolution ?? '').trim(),
    createdAt: now,
    updatedAt: now
  };
  items.push(gap);
  writeAll(items);
  return gap;
}

function update(rawId, payload) {
  const original = getById(rawId);
  const items = readAll();
  const next = { ...original };
  for (const field of FIELDS) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      next[field] = typeof payload[field] === 'string' && !['priority', 'riskLevel', 'status'].includes(field)
        ? payload[field].trim()
        : payload[field];
    }
  }
  next.updatedAt = new Date().toISOString();
  writeAll(items.map(item => item.id === next.id ? next : item));
  return next;
}

function remove(rawId) {
  const original = getById(rawId);
  writeAll(readAll().filter(item => item.id !== original.id));
  return original;
}

function report() {
  const items = readAll();
  const byStatus = Object.fromEntries(ALLOWED_STATUS.map(s => [s, 0]));
  const byRiskLevel = Object.fromEntries(ALLOWED_LEVELS.map(s => [s, 0]));
  for (const item of items) {
    if (Object.hasOwn(byStatus, item.status)) byStatus[item.status]++;
    if (Object.hasOwn(byRiskLevel, item.riskLevel)) byRiskLevel[item.riskLevel]++;
  }
  const completed = items.filter(item => CLOSED_STATUS.has(item.status)).length;
  const pending = items.length - completed;
  const highRiskOpen = items.filter(item => item.riskLevel === 'high' && !CLOSED_STATUS.has(item.status)).length;
  return { total: items.length, completed, pending, highRiskOpen, byStatus, byRiskLevel };
}

module.exports = { getById, list, create, update, remove, report, ALLOWED_STATUS, ALLOWED_LEVELS };
