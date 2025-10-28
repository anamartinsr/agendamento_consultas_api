import { Router } from 'express';
import ScheduleExceptionController from '../controllers/scheduleException.controller.js';

const router = new Router();

router.post('/', ScheduleExceptionController.create);
router.get('/', ScheduleExceptionController.index);
router.get('/:id', ScheduleExceptionController.show);
router.put('/:id', ScheduleExceptionController.update);
router.delete('/:id', ScheduleExceptionController.delete);

export default router;
