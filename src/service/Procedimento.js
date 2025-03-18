import prisma from '../../prisma/index';

class ProcedimentoService {
    /**
     * Cria um novo procedimento no banco de dados.
     *
     * @param {Object} dados - Dados do procedimento a ser criado.
     * @returns {Promise<Object>} - Procedimento criado.
     * @throws {Error} - Se o profissional não for encontrado.
     */
    static async create(dados) {
        const profissionalExistente = await prisma.profissional.findUnique({
            where: {
                id: dados.profissionalId,
            },
        });

        if (!profissionalExistente) {
            throw new Error('Profissional não encontrado');
        }

        return prisma.procedimento.create({
            data: dados,
        });
    }

    /**
     * Retorna todos os procedimentos do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de procedimentos.
     */
    static async findAll() {
        return prisma.procedimento.findMany({
            include: {
                profissional: {
                    include: {
                        user: {
                            select: {
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Retorna um procedimento pelo seu ID.
     *
     * @param {number} id - ID do procedimento.
     * @returns {Promise<Object|null>} - Procedimento encontrado ou null se não existir.
     */
    static async findById(id) {
        return prisma.procedimento.findUnique({
            where: { id },
            include: {
                profissional: {
                    include: {
                        user: {
                            select: {
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Atualiza um procedimento existente no banco de dados.
     *
     * @param {number} id - ID do procedimento a ser atualizado.
     * @param {Object} dados - Dados atualizados do procedimento.
     * @returns {Promise<Object>} - Procedimento atualizado.
     */
    static async update(id, dados) {
        return prisma.procedimento.update({
            where: { id },
            data: dados,
        });
    }

    /**
     * Deleta um procedimento do banco de dados.
     *
     * @param {number} id - ID do procedimento a ser deletado.
     * @returns {Promise<Object>} - Procedimento deletado.
     */
    static async delete(id) {
        return prisma.procedimento.delete({
            where: { id },
        });
    }
}

export default ProcedimentoService;
