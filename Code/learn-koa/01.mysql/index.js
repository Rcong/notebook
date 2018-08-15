const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const router = new Router();

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        console.log(e);
        ctx.body = {
            msg: e
        }
    }
})

app.use(bodyparser());

app.use(router.routes());

app.listen(8080 , () => {
    console.info('app start');
});