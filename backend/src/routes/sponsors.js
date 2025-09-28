import { Router } from 'express';
import * as ctrl from '../controllers/sponsorController.js';
import { authenticate } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roles.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authorizeRoles('ADMIN'), ctrl.create);
router.put('/:id', authorizeRoles('ADMIN'), ctrl.update);
router.delete('/:id', authorizeRoles('ADMIN'), ctrl.remove);
export default router;
