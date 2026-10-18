const HttpError = require('../utils/httpError');
const { ALLOWED_STATUS, ALLOWED_LEVELS } = require('../services/gapService');

const EDITABLE = new Set(['title', 'description', 'priority', 'assignee', 'status', 'category', 'riskLevel', 'resolution']);

function validatePayload(payload, isUpdate = false) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'İstek gövdesi bir JSON nesnesi olmalıdır.');
  }
  const keys = Object.keys(payload);
  if (isUpdate && keys.length === 0) throw new HttpError(400, 'Güncellenecek en az bir alan gönderilmeli.');
  for (const key of keys) {
    if (!EDITABLE.has(key)) throw new HttpError(400, `Desteklenmeyen alan: ${key}`);
  }

  for (const key of ['title', 'description', 'priority', 'assignee']) {
    if (!isUpdate && payload[key] === undefined) {
      throw new HttpError(400, `${key} zorunlu alandır.`);
    }
  }

  for (const field of ['title', 'description', 'assignee', 'category']) {
    if (payload[field] !== undefined) {
      if (typeof payload[field] !== 'string' || !payload[field].trim() || payload[field].trim().length > 500) {
        throw new HttpError(400, `${field} boş olmayan ve en fazla 500 karakterlik bir metin olmalıdır.`);
      }
    }
  }
  if (payload.resolution !== undefined && (typeof payload.resolution !== 'string' || payload.resolution.length > 2000)) {
    throw new HttpError(400, 'resolution en fazla 2000 karakterlik metin olmalıdır.');
  }
  for (const field of ['riskLevel', 'priority']) {
    if (payload[field] !== undefined && !ALLOWED_LEVELS.includes(payload[field])) {
      throw new HttpError(400, `${field}: low, medium veya high olmalıdır.`);
    }
  }
  if (payload.status !== undefined && !ALLOWED_STATUS.includes(payload.status)) {
    throw new HttpError(400, `status: ${ALLOWED_STATUS.join(', ')} değerlerinden biri olmalıdır.`);
  }
}

function validateCreate(req, _res, next) {
  try { validatePayload(req.body); next(); } catch (error) { next(error); }
}
function validateUpdate(req, _res, next) {
  try { validatePayload(req.body, true); next(); } catch (error) { next(error); }
}

module.exports = { validateCreate, validateUpdate, validatePayload };
