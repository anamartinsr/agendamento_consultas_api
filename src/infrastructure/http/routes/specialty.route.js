import { Router } from 'express';
import SpecialtyController from '../controllers/specialty.controller.js';

const router = new Router();

router.post('/', SpecialtyController.create);
router.get('/', SpecialtyController.index);
router.get('/:id', SpecialtyController.show);
router.put('/:id', SpecialtyController.update);
router.delete('/:id', SpecialtyController.delete);

export default router;
