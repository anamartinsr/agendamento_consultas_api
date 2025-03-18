import { Router } from 'express';
import Consulta from '../controllers/Consulta';

const router = new Router();

/**
 * Rota para criar uma nova consulta.
 *
 * @route POST /consulta
 * @param {Object} dados - Dados da consulta a ser criada.
 * @returns {Object} - Consulta criada.
 */
router.post('/', Consulta.create);

/**
 * Rota para obter uma consulta pelo ID.
 *
 * @route GET /consulta/:id
 * @param {number} id - ID da consulta.
 * @returns {Object} - Consulta encontrada.
 */
router.get('/:id', Consulta.show);

/**
 * Rota para listar todas as consultas.
 *
 * @route GET /consulta
 * @returns {Array} - Lista de consultas.
 */
router.get('/', Consulta.index);

/**
 * Rota para atualizar uma consulta existente.
 *
 * @route PUT /consulta/:id
 * @param {number} id - ID da consulta a ser atualizada.
 * @param {Object} dados - Dados atualizados da consulta.
 * @returns {Object} - Consulta atualizada.
 */
router.put('/:id', Consulta.update);

/**
 * Rota para deletar uma consulta.
 *
 * @route DELETE /consulta/:id
 * @param {number} id - ID da consulta a ser deletada.
 * @returns {Object} - Consulta deletada.
 */
router.delete('/:id', Consulta.delete);

export default router;
