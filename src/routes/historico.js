import { Router } from 'express';
import Historico from '../controllers/Historico';

const router = new Router();

/**
 * Rota para criar um novo histórico.
 *
 * @route POST /historico
 * @param {Object} dados - Dados do histórico a ser criado.
 * @returns {Object} - Histórico criado.
 */
router.post('/', Historico.create);

/**
 * Rota para obter um histórico pelo ID.
 *
 * @route GET /historico/:id
 * @param {number} id - ID do histórico.
 * @returns {Object} - Histórico encontrado.
 */
router.get('/:id', Historico.show);

/**
 * Rota para listar todos os históricos.
 *
 * @route GET /historico
 * @returns {Array} - Lista de históricos.
 */
router.get('/', Historico.index);

export default router;
