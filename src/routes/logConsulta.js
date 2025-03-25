import { Router } from 'express';
import LogConsulta from '../controllers/LogConsulta.js';

const router = new Router();

/**
 * Rota para criar um novo registro logConsulta.
 *
 * @route POST /logConsulta
 * @param {Object} dados - Dados do logConsulta a ser criado.
 * @returns {Object} - logConsulta criada.
 */
router.post('/', LogConsulta.create);

export default router;
