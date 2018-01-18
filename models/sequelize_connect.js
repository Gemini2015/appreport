const Sequelize = require('sequelize');
const database_config = require('./database_config');

var sequelize = new Sequelize(database_config.database, database_config.username, database_config.password, {
    host: database_config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = sequelize