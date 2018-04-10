'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var movieController = require('../controllers/movieController')

router.get('/movie', movieController.getList);
router.post('/movie', movieController.create );
router.get('/movie/:id', movieController.get);
router.put('/movie/:id', movieController.update);
router.delete('/movie/:id', movieController.remove);

module.exports = router;











