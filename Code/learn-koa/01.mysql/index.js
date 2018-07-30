const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const Sequelize = require('sequelize');
const router = new Router();

let sequelize = new Sequelize(
    'test',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    }
);

let User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
});

(async () => {
    await sequelize.sync();
    console.info('database init success');
    // await User.create({ firstName: '绿谷', lastName: '出久' });
})();

app.use(bodyparser());

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

app.use(router.routes());

app.listen(8080 , () => {
    console.info('app start');
});

