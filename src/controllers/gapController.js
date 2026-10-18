const service = require('../services/gapService');

exports.getAll = (req, res) => res.json(service.list(req.query));
exports.getOne = (req, res) => res.json({ data: service.getById(req.params.id) });
exports.create = (req, res) => res.status(201).json({ message: 'Kayıt oluşturuldu.', data: service.create(req.body) });
exports.update = (req, res) => res.json({ message: 'Kayıt güncellendi.', data: service.update(req.params.id, req.body) });
exports.remove = (req, res) => { service.remove(req.params.id); res.status(204).end(); };
exports.search = (req, res) => res.json(service.list({ ...req.query, keyword: req.query.keyword }));
exports.byAssignee = (req, res) => res.json(service.list({ ...req.query, assignee: req.params.name }));
