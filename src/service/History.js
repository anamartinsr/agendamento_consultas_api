import prisma from '../../prisma/index.js';

class HistoricoService {
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
}

export default HistoricoService;
