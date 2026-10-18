const express = require('express');
const controller = require('../controllers/reportController');
const router = express.Router();
router.get('/summary', controller.summary);
router.get('/completed', controller.completed);
router.get('/pending', controller.pending);
module.exports = router;
