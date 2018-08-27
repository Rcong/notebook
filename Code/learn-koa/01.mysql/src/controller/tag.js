const tagSer = require('../service/tag');
const Router = require('koa-router');
const router = new Router();

router.post('/save', async (ctx) => {
    let {id, name} = ctx.request.body;
    await tagSer.saveTag({id, name});
    ctx.resSuc();
});

router.get('/list', async (ctx) => {
    let list = await tagSer.tagList();
    ctx.resSuc(list);
});

router.post('/delete', async (ctx) => {
    let {id} = ctx.request.body;
    await tagSer.deleteTag(id);
    ctx.resSuc();
});

module.exports = router;