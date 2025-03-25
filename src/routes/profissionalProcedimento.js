import { Router } from 'express';
import ProfissionalProcedimento from '../controllers/ProfissionalProcedimento.js';

const router = new Router();

/**
 * Rota para criar um novo registro ProfissionalProcedimento.
 *
 * @route POST /ProfissionalProcedimento
 * @param {Object} dados - Dados do ProfissionalProcedimento a ser criado.
 * @returns {Object} - ProfissionalProcedimento criado.
 */
router.post('/', ProfissionalProcedimento.create);

export default router;
