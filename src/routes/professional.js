import { Router } from 'express';
import Professional from '../controllers/Professional.js';

const router = new Router();

router.post('/', Professional.create);
router.get('/:id', Professional.show);
router.get('/', Professional.index);
router.put('/:id', Professional.update);
router.delete('/:id', Professional.delete);

export default router;
