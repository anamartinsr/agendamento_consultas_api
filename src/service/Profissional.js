import prisma from '../../prisma/index.js';

class ProfissionalService {
    /**
     * Cria um novo profissional no banco de dados.
     *
     * @param {Object} dados - Dados do profissional a ser criado.
     * @returns {Promise<Object>} - Profissional criado.
     * @throws {Error} - Se o usuário não for encontrado ou ocorrer um erro ao criar o profissional.
     */
    static async create(dados) {
        try {
            const usuarioExistente = await prisma.user.findUnique({
                where: {
                    id: dados.usuarioId,
                },
            });

            if (!usuarioExistente) {
                throw new Error('Usuário não encontrado');
            }

            const profissionalCriado = await prisma.profissional.create({
                data: {
                    especialidade: dados.especialidade,
                    user: {
                        connect: { id: dados.usuarioId },
                    },
                },
            });

            return profissionalCriado;
        } catch (e) {
            throw new Error(`Erro ao criar profissional: ${e.message}`);
        }
    }

    /**
     * Retorna todos os profissionais do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de profissionais.
     */
    static async findAll() {
        return prisma.profissional.findMany({
            include: {
                user: true,
            },
        });
    }

    /**
     * Retorna um profissional pelo seu ID.
     *
     * @param {number} id - ID do profissional.
     * @returns {Promise<Object|null>} - Profissional encontrado ou null se não existir.
     */
    static async findById(id) {
        return prisma.profissional.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    }

    /**
     * Atualiza um profissional existente no banco de dados.
     *
     * @param {number} id - ID do profissional a ser atualizado.
     * @param {Object} dados - Dados atualizados do profissional.
     * @returns {Promise<Object>} - Profissional atualizado.
     */
    static async update(id, dados) {
        return prisma.profissional.update({
            where: { id },
            data: dados,
        });
    }

    /**
     * Deleta um profissional do banco de dados.
     *
     * @param {number} id - ID do profissional a ser deletado.
     * @returns {Promise<Object>} - Profissional deletado.
     */
    static async delete(id) {
        return prisma.profissional.delete({
            where: { id },
        });
    }
}

export default ProfissionalService;
