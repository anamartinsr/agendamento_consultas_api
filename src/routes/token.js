import { Router } from 'express';
import Token from '../controllers/Token';

const router = new Router();

/**
 * Rota para criar um novo token.
 *
 * @route POST /token
 * @param {Object} dados - Dados necessários para criar o token.
 * @returns {Object} - Token criado.
 */
router.post('/', Token.store);

export default router;
