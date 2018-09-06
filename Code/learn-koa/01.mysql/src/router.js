const Router = require('koa-router');
const userCtrl = require('./controller/user');
const router = new Router();

// router.post('/user/login', userCtrl.login);

router.use('/user', userCtrl.routes());

module.exports = router;