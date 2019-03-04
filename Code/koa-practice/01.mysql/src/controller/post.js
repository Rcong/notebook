const Router = require('koa-router');
const router = new Router();
let postSer = require('../service/post');
let tagSer = require('../service/tag');

router.post('/save', async ctx => {
    let {tagList, postData} = ctx.request.body;
    let res = await postSer.savePost(postData);
    await tagSer.savePostTag(tagList, res.id);
    ctx.resSuc();
});

router.post('/change', async ctx => {
    let postData = ctx.request.body;
    await postSer.savePost(postData);
    ctx.resSuc();
});

router.get('/list', async ctx => {
    let postList = await postSer.postList({pageSize: 100});
    ctx.resSuc(postList);
});

router.get('/one', async ctx => {
    let {postId} = ctx.query;
    let postData = await postSer.getPost({postId});
    let tagList = await tagSer.getPostTag(postId);
    ctx.resSuc({postData, tagList});
});

router.post('/delete', async ctx => {
    let {postId} = ctx.request.body;
    await postSer.deletePost(postId)
    ctx.resSuc();
});

module.exports = router;