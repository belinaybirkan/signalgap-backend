const express = require('express');
const controller = require('../controllers/gapController');
const { validateCreate, validateUpdate } = require('../middleware/validateGap');
const router = express.Router();

// Özel yollar /:id yolundan önce tanımlanmalı.
router.get('/search', controller.search);
router.get('/assignee/:name', controller.byAssignee);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validateCreate, controller.create);
router.put('/:id', validateUpdate, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
