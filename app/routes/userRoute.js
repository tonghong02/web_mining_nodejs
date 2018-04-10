'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var userController = require('../controllers/userController')

router.get('/user', userController.getList);
router.post('/user', userController.create );
router.get('/user/:id', userController.get);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.remove);

module.exports = router;











