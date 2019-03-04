import { get, post } from './fetch';

export default {
    fetchRoleList: () => get('/api/roleList'),
    fetchRoleDetail: data => get('/api/roleDetail', data)
}