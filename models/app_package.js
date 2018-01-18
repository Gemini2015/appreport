const Sequelize = require('sequelize');
const sequelize = require('./sequelize_connect');

const AppPackage = sequelize.define('AppPackage', {
	id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
	platform: Sequelize.STRING,
	version: Sequelize.STRING,
	time: Sequelize.DATE,
	size: Sequelize.INTEGER,
	commit_version: Sequelize.STRING,
});

sequelize.sync();

module.exports = AppPackage;