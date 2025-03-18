import { Router } from 'express';
import User from '../controllers/User.js';

const router = new Router();

/**
 * Rota para listar todos os usuários.
 *
 * @route GET /user
 * @returns {Array} - Lista de usuários.
 */
router.get('/', User.index);

/**
 * Rota para obter um usuário pelo ID.
 *
 * @route GET /user/:id
 * @param {number} id - ID do usuário.
 * @returns {Object} - Usuário encontrado.
 */
router.get('/:id', User.show);

/**
 * Rota para criar um novo usuário.
 *
 * @route POST /user
 * @param {Object} dados - Dados do usuário a ser criado.
 * @returns {Object} - Usuário criado.
 */
router.post('/', User.create);

/**
 * Rota para atualizar um usuário existente.
 *
 * @route PUT /user/:id
 * @param {number} id - ID do usuário a ser atualizado.
 * @param {Object} dados - Dados atualizados do usuário.
 * @returns {Object} - Usuário atualizado.
 */
router.put('/:id', User.update);

/**
 * Rota para deletar um usuário.
 *
 * @route DELETE /user/:id
 * @param {number} id - ID do usuário a ser deletado.
 * @returns {Object} - Usuário deletado.
 */
router.delete('/:id', User.delete);

export default router;
