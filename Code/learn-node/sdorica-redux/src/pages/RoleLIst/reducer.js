import * as types from './actionType';

const initialState = {
    isLoading: true,
    pageSize: 5,
    roleList: []
};

export default function(state = initialState, action) {
    
    switch(action.type) {
        // 请求角色列表
        case types.ROLELIST_FETCH:
            return { ...state, isLoading: true };
        // 请求角色列表成功
        case types.ROLELIST_SUCCESS:
            return { ...state, isLoading: false };
        // 请求角色列表失败
        case types.ROLELIST_ERROR:
            return { ...state, isLoading: false };
        default:
            return state;
    }

};