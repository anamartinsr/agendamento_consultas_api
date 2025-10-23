import { Router } from 'express';
import AvailabilityController from '../controllers/availability.controller.js';

const router = Router();

router.post('/', AvailabilityController.create);
router.get('/', AvailabilityController.index);
router.get('/:id', AvailabilityController.show);
router.get('/professional/:professionalId', AvailabilityController.findByProfessional);
router.put('/:id', AvailabilityController.update);
router.delete('/:id', AvailabilityController.delete);

export default router;
