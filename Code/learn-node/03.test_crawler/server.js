import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './src/router'
import cors from 'koa-cors'

let app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.resFail(e);
        console.error('---', e, e.message, e.stack);
    }
});

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(router.routes());
app.listen(7878, () => { console.info('start'); });