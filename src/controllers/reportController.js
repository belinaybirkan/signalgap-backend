const { report } = require('../services/gapService');
exports.summary = (_req, res) => res.json({ data: report() });
exports.completed = (_req, res) => res.json({ data: { completed: report().completed } });
exports.pending = (_req, res) => res.json({ data: { pending: report().pending } });
