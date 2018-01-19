const router = require('koa-router')()
var AppPackage = require('../models/app_package')

router.prefix('/api')

router.get('/upload', async (ctx, next) => {
	console.log('Get Upload')
	ctx.body = 'Ok'
})

router.post('/upload', async (ctx, next) => {
	ctx.request.body.time = Date.now()
	var apppackage = await AppPackage.create(ctx.request.body)
	console.log('Upload: ' + JSON.stringify(apppackage))
	ctx.body = 'Upload Success: ' + JSON.stringify(apppackage)
})

module.exports = router