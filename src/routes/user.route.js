import { Router } from 'express';
import User from '../controllers/user.controller.js';

const router = new Router();

router.get('/', User.index);
router.get('/:id', User.show);
router.post('/', User.create);
router.put('/:id', User.update);
router.delete('/:id', User.delete);

export default router;