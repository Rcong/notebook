const Sequelize = require('sequelize');
const config = require('../config');
const Path = require('path');

let sequelize = new Sequelize(
    // config.database,
    // config.username,
    // config.password,
    // {
    //     host: config.host,
    //     dialect: config.dialect,
    //     port: config.port
    // }
    'test',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: '3306'
    }
);

async function init (){
    await sequelize.sync();
    console.info('database init success');
}

exports.init = init; 
exports['user'] = sequelize.import(Path.join(__dirname, 'user'));
exports['post'] = sequelize.import(Path.join(__dirname, 'post'));
exports['tag'] = sequelize.import(Path.join(__dirname, 'tag'));
// exports['user'] = sequelize.import(Path.join(__dirname, 'post_tag'));