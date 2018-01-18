var express = require('express');
var router = express.Router();
var AppPackage = require('../models/app_package')

/* GET home page. */
router.get('/', function(req, res, next) {

  	res.render('index', { title: 'App Report' });
});

module.exports = router;
