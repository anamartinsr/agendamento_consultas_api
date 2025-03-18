import { Router } from 'express';
import Disponibilidade from '../controllers/Disponibilidade';

const router = new Router();

/**
 * Rota para criar uma nova disponibilidade.
 *
 * @route POST /disponibilidade
 * @param {Object} dados - Dados da disponibilidade a ser criada.
 * @returns {Object} - Disponibilidade criada.
 */
router.post('/', Disponibilidade.create);

/**
 * Rota para obter uma disponibilidade pelo ID.
 *
 * @route GET /disponibilidade/:id
 * @param {number} id - ID da disponibilidade.
 * @returns {Object} - Disponibilidade encontrada.
 */
router.get('/:id', Disponibilidade.show);

/**
 * Rota para listar todas as disponibilidades.
 *
 * @route GET /disponibilidade
 * @returns {Array} - Lista de disponibilidades.
 */
router.get('/', Disponibilidade.index);

/**
 * Rota para atualizar uma disponibilidade existente.
 *
 * @route PUT /disponibilidade/:id
 * @param {number} id - ID da disponibilidade a ser atualizada.
 * @param {Object} dados - Dados atualizados da disponibilidade.
 * @returns {Object} - Disponibilidade atualizada.
 */
router.put('/:id', Disponibilidade.update);

/**
 * Rota para deletar uma disponibilidade.
 *
 * @route DELETE /disponibilidade/:id
 * @param {number} id - ID da disponibilidade a ser deletada.
 * @returns {Object} - Disponibilidade deletada.
 */
router.delete('/:id', Disponibilidade.delete);

export default router;
