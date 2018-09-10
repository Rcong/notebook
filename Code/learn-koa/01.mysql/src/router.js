const Router = require('koa-router');
const userCtrl = require('./controller/user');
const verifyUser = require('./middleware/auth');
const router = new Router();


router.use('/user', userCtrl.routes());
router.get('/user/auth', verifyUser, ctx => ctx.resSuc());


module.exports = router;