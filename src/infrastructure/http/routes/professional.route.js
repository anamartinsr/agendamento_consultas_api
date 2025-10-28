import { Router } from 'express';
import ProfessionalController from '../controllers/professional.controller.js';

const router = new Router();

router.post('/', ProfessionalController.create);
router.get('/', ProfessionalController.index);
router.get('/:id', ProfessionalController.show);
router.put('/:id', ProfessionalController.update);
router.delete('/:id', ProfessionalController.delete);

export default router;
