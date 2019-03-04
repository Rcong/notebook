const { Tag, PostTag, Op } = require('../model');

exports.saveTag = async tagData => {
    return await Tag.upsert(tagData);
};

exports.tagList = async () => {
    return await Tag.findAll();
}

exports.deleteTag = async id => {
    return await Tag.destroy({ where: { id } });
}

exports.tagListByIds = async ids => {
    return await Tag.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });
}

exports.savePostTag = async (tagIdList, postId) => {
    let postTagList = await PostTag.findAll({
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
        await PostTag.bulkCreate(addTagIdList.map(tagId => {
            return {
                tagId,
                postId
            }
        }));
    }
    if (delTagIdList.length) {
        await PostTag.destroy({
            where: {
                postId,
                tagId: {
                    [Op.in]: delTagIdList
                }
            }
        });
    }
}

exports.getPostTag = async postId => {
    return await PostTag.findAll({
        where: {
            postId
        }
    });
}

exports.getPostTagList = async postId => {
    let postTagList = await exports.getPostTag(postId);
    return postTagList && postTagList.length ? await exports.tagListByIds(postTagList.map(t => t.tagId)) : [];
}