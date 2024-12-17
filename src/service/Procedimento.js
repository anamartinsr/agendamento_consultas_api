import prisma from '../../prisma/index';

class ProcedimentoService {
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

    static async update(id, dados) {
        return prisma.procedimento.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.procedimento.delete({
            where: { id },
        });
    }
}

export default ProcedimentoService;
