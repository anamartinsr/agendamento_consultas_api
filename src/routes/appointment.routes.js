import { Router } from 'express';
import AppointmentController from '../controllers/appointment.controller.js';

const router = new Router();

router.post('/', AppointmentController.create);
router.get('/', AppointmentController.index);
router.get('/:id', AppointmentController.show);
router.put('/:id', AppointmentController.update);
router.delete('/:id', AppointmentController.delete);

export default router;
