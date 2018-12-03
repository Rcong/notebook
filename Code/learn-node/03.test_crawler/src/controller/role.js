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
let fetchRoleDetail = async(ctx, next) => {
    let { roleUrl } = ctx.params;
    let data = await Role.fetchRoleDetail(roleUrl);
    ctx.body = {
        success: true,
        status: 200,
        data: data
    }
}

export default {
    fetchRoleList,
    fetchRoleDetail
}