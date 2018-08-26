const BlogPost = require('../model').post;

exports.savePost = async (postData) => {
    if (postData && postData.id) {
        await BlogPost.update(postData, {
            where: {
                id: postData.id
            }
        });
        return postData;
    } else {
        return await BlogPost.create(postData);
    }
};

exports.deletePost = async (postId) => {
    return await exports.savePost({id: postId, enable: 0});
};

exports.getPost = async ({postId, status}) => {
    let where = {
        id: postId,
        enable: 1
    }
    if (status != void 0) {
        where.status = status;
    }
    return await BlogPost.findOne({
        where
    });
};

exports.getPostByPathname = async ({pathname}) => {
    return await BlogPost.findOne({
        where: { 
            pathname,
            status: 1
        }
    })
}

exports.postList = async ({pageSize = 10, pageNo = 1}) => {
    pageNo = +pageNo;
    pageSize = +pageSize;
    let offset = (pageNo - 1) * pageSize;
    let limit = pageSize;
    return await BlogPost.findAll({
        where: {
            enable: 1
        }, 
        offset, limit
    });
};