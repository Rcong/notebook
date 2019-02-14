import * as types from './actionType';

// 请求角色列表
export function fetchRoleList() {
    return {
        type: types.ROLELIST_FETCH
    };
}