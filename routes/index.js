const router = require('koa-router')()
var AppPackage = require('../models/app_package')

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'App Report',
	})
})

router.post('/refresh', async (ctx, next) => {
	var packages = await AppPackage.findAll()
	ctx.body = JSON.stringify({
		packages: packages,
		result: 0
	})
})

module.exports = router
