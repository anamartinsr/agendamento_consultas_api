import prisma from '../../prisma/index.js';

class HistoricoService {
    /**
     * Cria um novo histórico no banco de dados.
     *
     * @param {Object} dados - Dados do histórico a ser criado.
     * @returns {Promise<Object>} - Histórico criado.
     * @throws {Error} - Se o usuário não for encontrado.
     */
    static async create(dados) {
        const userExistente = await prisma.user.findUnique({
            where: {
                id: dados.usuariosId,
            },
        });

        if (!userExistente) {
            throw new Error('Usuário não encontrado');
        }

        return prisma.historico.create({
            data: dados,
        });
    }

    /**
     * Retorna todos os históricos do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de históricos.
     */
    static async findAll() {
        return prisma.historico.findMany({
            include: {
                user: {
                    select: {
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }

    /**
     * Retorna um histórico pelo seu ID.
     *
     * @param {number} id - ID do histórico.
     * @returns {Promise<Object|null>} - Histórico encontrado ou null se não existir.
     */
    static async findById(id) {
        return prisma.historico.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }

    /**
     * Atualiza um histórico existente no banco de dados.
     *
     * @param {number} id - ID do histórico a ser atualizado.
     * @param {Object} dados - Dados atualizados do histórico.
     * @returns {Promise<Object>} - Histórico atualizado.
     */
    static async update(id, dados) {
        return prisma.historico.update({
            where: { id },
            data: dados,
        });
    }

    /**
     * Deleta um histórico do banco de dados.
     *
     * @param {number} id - ID do histórico a ser deletado.
     * @returns {Promise<Object>} - Histórico deletado.
     */
    static async delete(id) {
        return prisma.historico.delete({
            where: { id },
        });
    }
}

export default HistoricoService;
