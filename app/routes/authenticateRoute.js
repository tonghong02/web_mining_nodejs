'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var authenticateController = require('../controllers/authenticateController')

router.post('/login', authenticateController.login );
router.use(authenticateController.authenticate);

module.exports = router;











