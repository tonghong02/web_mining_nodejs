'use strict'
var express = require('express');
var app = express();
var router = express.Router();

var countryController = require('../controllers/countryController')

router.get('/country', countryController.getList);
router.post('/country', countryController.create );
router.get('/country/:id', countryController.get);
router.put('/country/:id', countryController.update);
router.delete('/country/:id', countryController.remove);

module.exports = router;











