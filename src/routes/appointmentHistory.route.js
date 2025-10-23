import { Router } from 'express';
import AppointmentHistoryController from '../controllers/appointmentHistory.controller.js';

const router = new Router();

router.post('/', AppointmentHistoryController.create);
router.get('/', AppointmentHistoryController.index);
router.get('/:id', AppointmentHistoryController.show);
router.put('/:id', AppointmentHistoryController.update);
router.delete('/:id', AppointmentHistoryController.delete);

export default router;
