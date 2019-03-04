const Router = require('koa-router');
const userCtrl = require('./controller/user');
const tagCtrl = require('./controller/tag');
const postCtrl = require('./controller/post');
const viewCtrl = require('./controller/view');
const router = new Router();
const auth = require('./middleware/auth');

router.get('/', viewCtrl.home);
router.use('/v', viewCtrl.router.routes());
router.post('/user/login', userCtrl.login);
router.get('/user/auth', auth, ctx => ctx.resSuc());
router.use('/tag', auth, tagCtrl.routes());
router.use('/post', auth, postCtrl.routes())


module.exports = router;