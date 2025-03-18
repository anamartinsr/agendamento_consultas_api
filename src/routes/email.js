import express from 'express';
import { sendTestEmail } from '../controllers/EmailController.js';

const router = express.Router();

/**
 * Rota para enviar um e-mail de teste.
 *
 * @route POST /email
 * @param {Object} req - Requisição contendo os dados do e-mail.
 * @param {Object} res - Resposta com o resultado do envio do e-mail.
 */
router.post('/', sendTestEmail);

export default router;
