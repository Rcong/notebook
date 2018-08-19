let Router = require('koa-router');
let router = new Router();
let userService = require('../service/user');
let auth = require('../middleware/auth');

router.post('/login', async ctx => {
    let {name, password} = ctx.query;
    let user = await userService.login({name, password});
    if (user) {
        ctx.session.user = user;
        ctx.body = 'login success';
    } else {
        ctx.body = 'login error';
    }
});

router.post('/api/createUser', async(ctx) => {
    let user = ctx.request.body;
    await User.create(user);
    ctx.body = user
});

router.get('/api/user', async ctx => {
    let { id } = ctx.query;
    ctx.body = await User.findOne({ where: { id } });
});

router.post('/api/editUser', async ctx => {
    let data = ctx.request.body;
    await User.update({
        lastName: data.lastName,
        firstName: data.firstName
    }, {
        where: {
            id: data.id
        }
    });
    ctx.body = await User.findOne({ where: { id: data.id } });
});

router.del('/api/delUser', async ctx => {
    let {id} = ctx.query;
    await User.destroy({ where: { id } });
    ctx.body = { status: 200 }
});

router.get('/api/userList', async(ctx, next) => {
    ctx.body = await User.findAndCountAll();
});

// router.get('/info', auth, async ctx => {
//     console.log(ctx.session);
//     ctx.body = ctx.session.user;
// });

module.exports = router;