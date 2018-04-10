'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var reviewController = require('../controllers/reviewController')

router.get('/review', reviewController.getList);
router.post('/review', reviewController.create);
router.get('/review/:id', reviewController.get);
router.put('/review/:id', reviewController.update);
router.delete('/review/:id', reviewController.remove);

module.exports = router;











