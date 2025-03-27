import { Router } from 'express';
import History from '../controllers/History.js';

const router = new Router();

router.post('/', History.create);
router.get('/:id', History.show);
router.get('/', History.index);

export default router;
