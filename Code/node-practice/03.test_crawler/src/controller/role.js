import Role from '../crawler/role'
import fs from 'fs'
import { resolve } from 'path'

let dbPath = dbName => resolve(__dirname, `../db/${dbName}.json`);

// 爬取角色列表
let fetchRoleList = async(ctx, next) => {

    let filePath = dbPath('roleList');
    let isFileExists = fs.existsSync(filePath);
    let data = '';

    if (isFileExists) {
        data = await fs.readFileSync(filePath);
        data = data.toString();
        data = JSON.parse(data);
    } else {
        data = await Role.fetchRoleList();
    }

    ctx.body = {
        success: true,
        status: 200,
        data: data
    }
}

// 爬取角色详情
let fetchRoleDetail = async(ctx, next) => {
    let { roleId } = ctx.query;

    let filePath = dbPath(`roleDetail-${roleId}`);
    let isFileExists = fs.existsSync(filePath);
    let data = '';

    if (isFileExists) {
        data = await fs.readFileSync(filePath);
        data = data.toString();
        data = JSON.parse(data);
    } else {
        data = await Role.fetchRoleDetail(roleId);
    }

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