import { Router } from 'express';
import Availability from '../controllers/Availability.js';

const router = new Router();

router.post('/', Availability.create);
router.get('/:id', Availability.show);
router.get('/', Availability.index);
router.put('/:id', Availability.update);
router.delete('/:id', Availability.delete);

export default router;
