const Router = require('koa-router');
const userCtrl = require('./controller/user');
const router = new Router();

router.use('/api/user', userCtrl.routes());

module.exports = router;