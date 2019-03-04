const BlogUser = require('../model').user;
const md5 = require('md5');

exports.login = async (ctx) => {
    let {
        name,
        password
    } = ctx.request.body;
    let res = await BlogUser.findOne({
        where: {
            name
        }
    });
    if (!res) {
        throw 'not find user';
    }
    if (res.password == md5(password)) {
        ctx.session.user = {
            id: res.id,
            name: res.name
        }
        ctx.resSuc();
        return ;
    }
    throw 'password error'
}