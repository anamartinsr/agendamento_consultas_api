import { Router } from 'express';
import Appointment from '../controllers/Appointment.js';

const router = new Router();

router.post('/', Appointment.create);
router.get('/:id', Appointment.show);
router.get('/', Appointment.index);
router.put('/:id', Appointment.update);
router.delete('/:id', Appointment.delete);

export default router;
