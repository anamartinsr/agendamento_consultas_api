/**
 * UserService
 *
 * Serviço responsável por gerenciar operações relacionadas ao modelo de usuário no banco de dados.
 * Utiliza o Prisma ORM para realizar operações CRUD.
 */

import prisma from '../../prisma/index';

class UserService {
    /**
     * Cria um novo usuário no banco de dados.
     *
     * @param {Object} dados - Dados do usuário a ser criado.
     * @returns {Promise<Object>} - Usuário criado.
     */
    static async create(dados) {
        return prisma.user.create({ data: dados });
    }

    /**
     * Retorna todos os usuários do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de usuários.
     */
    static async findAll() {
        return prisma.user.findMany();
    }

    /**
     * Retorna um usuário pelo seu ID.
     *
     * @param {number} id - ID do usuário.
     * @returns {Promise<Object|null>} - Usuário encontrado ou null se não existir.
     */
    static async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    /**
     * Atualiza um usuário existente no banco de dados.
     *
     * @param {number} id - ID do usuário a ser atualizado.
     * @param {Object} dados - Dados atualizados do usuário.
     * @returns {Promise<Object>} - Usuário atualizado.
     */
    static async update(id, dados) {
        return prisma.user.update({
            where: { id },
            data: dados,
        });
    }

    /**
     * Deleta um usuário do banco de dados.
     *
     * @param {number} id - ID do usuário a ser deletado.
     * @returns {Promise<Object>} - Usuário deletado.
     */
    static async delete(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
}

export default UserService;
