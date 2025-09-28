import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roles.js';

const router = Router();
router.post('/login', login);
router.post('/register', authenticate, authorizeRoles('ADMIN'), register);
export default router;
