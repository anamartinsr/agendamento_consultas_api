import { Router } from 'express';
import Profissional from '../controllers/Profissional';

const router = new Router();

/**
 * Rota para criar um novo profissional.
 *
 * @route POST /profissional
 * @param {Object} dados - Dados do profissional a ser criado.
 * @returns {Object} - Profissional criado.
 */
router.post('/', Profissional.create);

/**
 * Rota para obter um profissional pelo ID.
 *
 * @route GET /profissional/:id
 * @param {number} id - ID do profissional.
 * @returns {Object} - Profissional encontrado.
 */
router.get('/:id', Profissional.show);

/**
 * Rota para listar todos os profissionais.
 *
 * @route GET /profissional
 * @returns {Array} - Lista de profissionais.
 */
router.get('/', Profissional.index);

/**
 * Rota para atualizar um profissional existente.
 *
 * @route PUT /profissional/:id
 * @param {number} id - ID do profissional a ser atualizado.
 * @param {Object} dados - Dados atualizados do profissional.
 * @returns {Object} - Profissional atualizado.
 */
router.put('/:id', Profissional.update);

/**
 * Rota para deletar um profissional.
 *
 * @route DELETE /profissional/:id
 * @param {number} id - ID do profissional a ser deletado.
 * @returns {Object} - Profissional deletado.
 */
router.delete('/:id', Profissional.delete);

export default router;
