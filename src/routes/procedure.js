import { Router } from 'express';
import Procedure from '../controllers/Procedure.js';

const router = new Router();

router.post('/', Procedure.create);
router.get('/:id', Procedure.show);
router.get('/', Procedure.index);
router.put('/:id', Procedure.update);
router.delete('/:id', Procedure.delete);

export default router;
