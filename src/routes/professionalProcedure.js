import { Router } from 'express';
import ProfessionalProcedure from '../controllers/ProfessionalProcedure.js';

const router = new Router();

router.post('/', ProfessionalProcedure.create);

export default router;
