var express = require('express');
var router = express.Router();
var AppPackage = require('../models/app_package')

router.get('/upload', function(req, res, next) {
	res.send('Ok')
});

router.post('/upload', function(req, res, next) {
	req.body.time = Date.now();
	AppPackage.create(req.body)
		.then((apppackage) => {
			console.log('Upload: ' + JSON.stringify(apppackage));
			res.send('Upload Success: ' + JSON.stringify(apppackage));
		})
});

module.exports = router;