const BlogTag = require('../model').tag;
const BlogPostTag = require('../model').post_tag;
const Op = require('../model').Op;

exports.saveTag = async (tagData) => {
    return await BlogTag.upsert(tagData);
};

exports.tagList = async () => {
    return await BlogTag.findAll();
}

exports.deleteTag = async (id) => {
    return await BlogTag.destroy({
        where: {
            id
        }
    });
}

exports.tagListByIds = async (ids) => {
    return await BlogTag.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });
}

exports.savePostTag = async (tagIdList, postId) => {
    let postTagList = await BlogPostTag.findAll({
        where: {postId}
    }) || [];
    let oldTagIdList = postTagList.map(postTag => '' + postTag.tagId);
    let addTagIdList = [];
    let delTagIdList = [];
    tagIdList.map(tagId => {
        if (!~oldTagIdList.indexOf(tagId)) {
            addTagIdList.push(tagId);
        }
    });
    oldTagIdList.map(tagId => {
        if (!~tagIdList.indexOf(tagId)) {
            delTagIdList.push(tagId);
        }
    });
    if (addTagIdList.length) {
        await BlogPostTag.bulkCreate(addTagIdList.map(tagId => {
            return {
                tagId,
                postId
            }
        }));
    }
    if (delTagIdList.length) {
        await BlogPostTag.destroy({
            where: {
                postId,
                tagId: {
                    [Op.in]: delTagIdList
                }
            }
        });
    }
}

exports.getPostTag = async (postId) => {
    return await BlogPostTag.findAll({
        where: {
            postId
        }
    });
}

exports.getPostTagList = async (postId) => {
    let postTagList = await exports.getPostTag(postId);
    if (postTagList && postTagList.length) {
        return await exports.tagListByIds(postTagList.map(t => t.tagId));
    }
    return [];
}