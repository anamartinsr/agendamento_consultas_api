import prisma from '../../prisma/index.js';

class ProcedureService {
    static async create(dados) {
        const professionalExisting = await prisma.professional.findUnique({
            where: {
                id: dados.professionalId,
            },
        });

        if (!professionalExisting) {
            throw new Error('Professional not found');
        }

        return prisma.procedure.create({
            data: dados,
        });
    }
    static async findAll() {
        return prisma.procedure.findMany({
            include: {
                professional: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }
    static async findById(id) {
        return prisma.procedure.findUnique({
            where: { id },
            include: {
                professional: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    static async update(id, dados) {
        return prisma.procedure.update({
            where: { id },
            data: dados,
        });
    }
    static async delete(id) {
        return prisma.procedure.delete({
            where: { id },
        });
    }
}

export default ProcedureService;
