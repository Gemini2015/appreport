const router = require('koa-router')()
const Sequelize = require('sequelize');
var AppPackage = require('../models/app_package')

router.get('/', async (ctx, next) => {
	var projectCodes = await AppPackage.findAll({
		attributes: [
			[Sequelize.fn('DISTINCT', Sequelize.col('project_code')) ,'project_code'],
		]
	})
	var platforms = await AppPackage.findAll({
		attributes: [
			[Sequelize.fn('DISTINCT', Sequelize.col('platform')) ,'platform'],
		]
	})
	await ctx.render('index', {
		title: 'App Report',
		projectCodes: projectCodes,
		platforms: platforms
	})
})

router.post('/refresh', async (ctx, next) => {
	var param = ctx.request.body
	var where = {}
	if(param.project_code != "")
	{
		where.project_code = param.project_code
	}
	if(param.platform != "")
	{
		where.platform = param.platform
	}
	var packages = await AppPackage.findAll({
		where: where
	})
	// console.log(JSON.stringify(param) + " where " + JSON.stringify(where) + " result " + JSON.stringify(packages))
	ctx.body = JSON.stringify({
		packages: packages,
		result: 0
	})
})

module.exports = router
