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
                consulta: {
                    select: {
                        descricao: true,
                        status: true,
                        data: true,
                        dataStatusAlteracao: true,
                        isDeleted: true,
                    },
                },
                procedimento: {
                    select: {
                        nome: true,
                        valor: true,
                        recomendacao: true,
                    },
                },
                profissional: {
                    select: {
                        especialidade: true,
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
                consulta: {
                    select: {
                        descricao: true,
                        status: true,
                        data: true,
                        dataStatusAlteracao: true,
                        isDeleted: true,
                    },
                },
                procedimento: {
                    select: {
                        nome: true,
                        valor: true,
                        recomendacao: true,
                    },
                },
                profissional: {
                    select: {
                        especialidade: true,
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
   * Atualiza um histórico existente no banco de dados.
   *
   * @param {number} id - ID do histórico a ser atualizado.
   * @param {Object} dados - Dados atualizados do histórico.
   * @returns {Promise<Object>} - Histórico atualizado.
   */
}

export default HistoricoService;
