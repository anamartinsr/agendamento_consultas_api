import express from 'express';
import { sendEmailController } from '../controllers/Email.js';
const router = express.Router();

router.post('/', sendEmailController);

export default router;
