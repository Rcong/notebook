import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './src/router'
import cors from 'koa-cors'

let app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        // ctx.resFail(e);
        console.error('---', e, e.message, e.stack);
    }
});

app.use(bodyParser());
app.use(cors({
    origin: 'http://localhost:3000',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(router.routes());
app.listen(7878, () => { console.info('start'); });