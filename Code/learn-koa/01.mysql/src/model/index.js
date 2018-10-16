const Sequelize = require('sequelize');
const config = require('../config');
const Path = require('path');
let Op = Sequelize.Op;

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
exports.Op = Op;
exports.User = sequelize.import(Path.join(__dirname, 'user'));
exports.Post = sequelize.import(Path.join(__dirname, 'post'));
exports.Tag = sequelize.import(Path.join(__dirname, 'tag'));
exports.PostTag = sequelize.import(Path.join(__dirname, 'post_tag'));