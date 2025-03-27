import prisma from '../../prisma/index.js';

class DisponibilidadeService {
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

    static async update(id, dados) {
        return prisma.disponibilidade.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.disponibilidade.delete({
            where: { id },
        });
    }
}

export default DisponibilidadeService;
