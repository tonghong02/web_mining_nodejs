'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var historyController = require('../controllers/historyController')

router.get('/history', historyController.getList);
// router.post('/history', historyController.create );
router.get('/history/:id', historyController.get);
// router.put('/history/:id', historyController.update);
router.delete('/history/:id', historyController.remove);

module.exports = router;











