import prisma from '../../prisma/index.js';

class ConsultaService {
    static async create(dados) {
        const userExistente = await prisma.user.findUnique({
            where: {
                id: dados.usuariosId,
            },
        });

        if (!userExistente) {
            throw new Error('Usuario não encontrado');
        }

        const profissionalExistente = await prisma.profissional.findUnique({
            where: {
                id: dados.profissionalId,
            },
        });

        if (!profissionalExistente) {
            throw new Error('Profissional não encontrado');
        }

        const procedimentoExistente = await prisma.procedimento.findUnique({
            where: {
                id: dados.procedimentoId,
            },
        });

        if (!procedimentoExistente) {
            throw new Error('Procedimento não encontrado');
        }

        return prisma.consulta.create({
            data: dados,
        });
    }

    static async findAll() {
        return prisma.consulta.findMany({
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
                procedimento: true,
            },
        });
    }

    static async findById(id) {
        return prisma.consulta.findUnique({
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
                procedimento: true,
            },
        });
    }

    static async update(id, dados) {
        return prisma.consulta.update({
            where: { id },
            data: dados,
        });
    }
    static async delete(id) {
        return prisma.consulta.delete({
            where: { id },
        });
    }
}

export default ConsultaService;
