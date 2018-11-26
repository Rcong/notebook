
import Router from 'koa-router';
import Role from './controller/role'

const router = new Router();
router.get('/api/roleList', Role.fetchRoleList)

export default router;