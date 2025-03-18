import prisma from '../../prisma/index.js';

class DisponibilidadeService {
    /**
     * Cria uma nova disponibilidade no banco de dados.
     *
     * @param {Object} dados - Dados da disponibilidade a ser criada.
     * @returns {Promise<Object>} - Disponibilidade criada.
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

        return prisma.disponibilidade.create({
            data: dados,
        });
    }

    /**
     * Retorna todas as disponibilidades do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de disponibilidades.
     */
    static async findAll() {
        return prisma.disponibilidade.findMany({
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
     * Retorna uma disponibilidade pelo seu ID.
     *
     * @param {number} id - ID da disponibilidade.
     * @returns {Promise<Object|null>} - Disponibilidade encontrada ou null se não existir.
     */
    static async findById(id) {
        return prisma.disponibilidade.findUnique({
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
     * Atualiza uma disponibilidade existente no banco de dados.
     *
     * @param {number} id - ID da disponibilidade a ser atualizada.
     * @param {Object} dados - Dados atualizados da disponibilidade.
     * @returns {Promise<Object>} - Disponibilidade atualizada.
     */
    static async update(id, dados) {
        return prisma.disponibilidade.update({
            where: { id },
            data: dados,
        });
    }

    /**
     * Deleta uma disponibilidade do banco de dados.
     *
     * @param {number} id - ID da disponibilidade a ser deletada.
     * @returns {Promise<Object>} - Disponibilidade deletada.
     */
    static async delete(id) {
        return prisma.disponibilidade.delete({
            where: { id },
        });
    }
}

export default DisponibilidadeService;
