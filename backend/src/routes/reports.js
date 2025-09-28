import { Router } from 'express';
import { exportExcel } from '../controllers/reportController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
router.get('/excel', exportExcel);
export default router;
