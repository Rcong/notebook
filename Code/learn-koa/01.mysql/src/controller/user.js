let Router = require('koa-router');
let router = new Router();
let userService = require('../service/user');
// let auth = require('../middleware/auth');

router.get('/login', async ctx => {
    let {name, password} = ctx.query;
    let user = await userService.login({name, password});
    if (user) {
        ctx.session.user = user;
        ctx.body = 'login success';
    } else {
        ctx.body = 'login error';
    }
});

// router.get('/info', auth, async ctx => {
//     console.log(ctx.session);
//     ctx.body = ctx.session.user;
// });

module.exports = router;