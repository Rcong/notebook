
import Router from 'koa-router';
import RoleCtrl from './controller/role'

const router = new Router();

router.get('/api/roleList', RoleCtrl.fetchRoleList);
router.get('/api/roleDetail', RoleCtrl.fetchRoleDetail)

export default router;