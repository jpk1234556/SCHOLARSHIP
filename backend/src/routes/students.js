import { Router } from 'express';
import * as ctrl from '../controllers/studentController.js';
import { upload } from '../utils/multer.js';
import { authenticate } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roles.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authorizeRoles('ADMIN'), ctrl.create);
router.put('/:id', authorizeRoles('ADMIN'), ctrl.update);
router.delete('/:id', authorizeRoles('ADMIN'), ctrl.remove);
router.post('/:id/upload', authorizeRoles('ADMIN','GUARDIAN'), upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});
export default router;
