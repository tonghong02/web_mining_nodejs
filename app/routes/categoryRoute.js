'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var categoryController = require('../controllers/categoryController')

router.get('/category', categoryController.getList);
router.post('/category', categoryController.create );
router.get('/category/:id', categoryController.get);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.remove);

module.exports = router;











