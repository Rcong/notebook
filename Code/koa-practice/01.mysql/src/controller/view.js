const Router = require('koa-router');
let marked = require('marked');
const router = new Router();
const utils = require('../common/util');

let postSer = require('../service/post');
let tagSer = require('../service/tag');

let home = async ctx => {
    let { pageNo } = ctx.params;
    pageNo = pageNo || 1;

    let postList = await postSer.postList({ pageNo });
    let postListForView = [];

    for (let idx = 0; idx < postList.length; idx ++) {
        let post = postList[idx];
        let postTagList = await tagSer.getPostTagList(post.id);
        postListForView.push(
            Object.assign(post, {
                createTime: utils.formatTime(post.createdAt),
                tagList: postTagList,
                summaryHtml: marked(post.summary)
            })
        );
    }

    await ctx.render('home', {
        postList: postListForView, 
        pageNo
    });
}

router.get('/home/:pageNo', async ctx => {
    await home(ctx);
});

router.get('/post/:pathname', async ctx => {
    let {pathname} = ctx.params;
    let post = await postSer.getPostByPathname({pathname});
    let postTagList = await tagSer.getPostTagList(post.id);
    post = Object.assign(post, {
        contentHtml: marked(post.markdownContent),
        createTime: utils.formatTime(post.createdAt),
        postTagList
    });
    if (post) {
        await ctx.render('post', {
            post
        });
    }
});

module.exports = {router, home};