const Sequelize = require('sequelize');
const config = require('../config');
const Path = require('path');

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port
    }
);

async function init (){
    await sequelize.sync();
    console.info('database init success');
}

module.exports = init(); 
exports[user] = sequelize.import(Path.join(__dirname, 'user'));