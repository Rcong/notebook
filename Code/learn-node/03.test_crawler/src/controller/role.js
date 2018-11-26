import Role from '../crawler/role'

// 爬取角色列表
let fetchRoleList = async(ctx, next) => {
    let data = await Role.fetchRoleList();
    ctx.body = {
        success: true,
        status: 200,
        data: data
    }
}

// 爬取角色详情
let fetchRoleDetail = async(roleUrl) => {
    let $ = await requestPromise({ uri: `http://wxwy.dragonest.com${roleUrl}`, transform: body => cheerio.load(body) });
    let roleName = $('.abstract .roleName').text();
    let roleDesc = $('.abstract .roleText').text();
    
    return { roleName, roleDesc };
}

export default {
    fetchRoleList,
    fetchRoleDetail
}