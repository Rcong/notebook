import * as types from './actionType';
import Api from '@Api'

// export const loadUserData = (uid) => async (dispatch) => {
//     try {
//         dispatch({ type: USERDATA_REQUEST });
//         let { data } = await request.get(`/users/${uid}`);
//         dispatch({ type: USERDATA_SUCCESS, data });
//     } catch(error) {
//         dispatch({ type: USERDATA_ERROR, error });
//     }
// }

// 改变pageSize
export const changePageSize = pageSize => ({ type: types.PAGESIZE_CHANGE, data: { pageSize: pageSize } })

// 请求角色列表
export const fetchRoleList = () => async (dispatch) => {

    try {
        dispatch({ type: types.ROLELIST_REQUEST, data: { isLoading: true } });
        let roleList = await Api.fetchRoleList();
        dispatch({ type: types.ROLELIST_SUCCESS, data: { isLoading: false, roleList: roleList } })
    } catch (error) {
        dispatch({ type: ROLELIST_ERROR, data: { isLoading: false } });
    }
}