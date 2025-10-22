import { Router } from 'express';
import User from '../controllers/user.controller.js';

const router = new Router();

router.get('/', UserController.index);
router.post('/', UserController.create);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;