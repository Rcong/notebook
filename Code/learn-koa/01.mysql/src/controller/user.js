let Router = require('koa-router');
let router = new Router();
let User = require('../model').user;
let md5 = require('md5');

router.post('/login', async ctx => {
    let { name, password } = ctx.request.body;
    console.info(name, password);
    let user = await User.findOne({ where: { name } });
    console.info('user', user);
    if (!user) {
        throw 'not find user';
    }

    if (user.password === password) {
        ctx.session.user = { id: res.id, name: res.name }
        ctx.resSuc();
        return ;
    }

    throw 'password error'
});

module.exports = router;
// exports.login = async (ctx) => {
//     let {
//         name,
//         password
//     } = ctx.request.body;
//     let res = await BlogUser.findOne({
//         where: {
//             name
//         }
//     });
//     if (!res) {
//         throw 'not find user';
//     }
//     if (res.password == md5(password)) {
//         ctx.session.user = {
//             id: res.id,
//             name: res.name
//         }
//         ctx.resSuc();
//         return ;
//     }
//     throw 'password error'
// }