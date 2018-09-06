let Router = require('koa-router');
let router = new Router();
let User = require('../model').user;
let md5 = require('md5');

router.post('/save', async ctx => {
    let { name, password } = ctx.request.body;
    await User.update({
        name: name,
        password: md5(password)
    }, {
        where: {
            id: 1
        }
    })
    
    ctx.resSuc();
});

router.post('/login', async ctx => {
    let { name, password } = ctx.request.body;
    let user = await User.findOne({ where: { name } });

    if (!user) throw 'not find user';

    if (user.password === md5(password)) {
        ctx.session.user = { id: user.id, name: user.name }
        ctx.resSuc();
        return ;
    }

    throw 'password error'
});

module.exports = router;