import { Router } from 'express';
import Procedimento from '../controllers/Procedimento.js';

const router = new Router();

/**
 * Rota para criar um novo procedimento.
 *
 * @route POST /procedimento
 * @param {Object} dados - Dados do procedimento a ser criado.
 * @returns {Object} - Procedimento criado.
 */
router.post('/', Procedimento.create);

/**
 * Rota para obter um procedimento pelo ID.
 *
 * @route GET /procedimento/:id
 * @param {number} id - ID do procedimento.
 * @returns {Object} - Procedimento encontrado.
 */
router.get('/:id', Procedimento.show);

/**
 * Rota para listar todos os procedimentos.
 *
 * @route GET /procedimento
 * @returns {Array} - Lista de procedimentos.
 */
router.get('/', Procedimento.index);

/**
 * Rota para atualizar um procedimento existente.
 *
 * @route PUT /procedimento/:id
 * @param {number} id - ID do procedimento a ser atualizado.
 * @param {Object} dados - Dados atualizados do procedimento.
 * @returns {Object} - Procedimento atualizado.
 */
router.put('/:id', Procedimento.update);

/**
 * Rota para deletar um procedimento.
 *
 * @route DELETE /procedimento/:id
 * @param {number} id - ID do procedimento a ser deletado.
 * @returns {Object} - Procedimento deletado.
 */
router.delete('/:id', Procedimento.delete);

export default router;
