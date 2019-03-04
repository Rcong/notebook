let Koa = require('koa');
let app = new Koa();
let bodyparser = require('koa-bodyparser');
let db = require('./src/model');
let router = require('./src/router');
let session = require('koa-session');
const utils = require('./src/middleware/utils');
let cors = require('@koa/cors');
let render = require('koa-ejs');
let path = require('path');

db.init().then(() => console.log('db init success'));

const config = {
    key: 'koa:sessxxx',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: false,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(cors({ credentials: true }));

render(app, {
    root: path.join(__dirname, 'src/view'),
    layout: 'home',
    viewExt: 'html',
    cache: false,
    debug: false
});

app.use(utils);

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.resFail(e);
        console.error('---', e, e.message, e.stack);
    }
});


app.use(session(config, app));
app.use(bodyparser());

app.use(router.routes());

app.listen(7878, () => {
    console.log('start');
});