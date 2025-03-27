import prisma from '../../prisma/index.js';

class AvailabilityService {
    static async create(dados) {
        const professionalExisting = await prisma.professional.findUnique({
            where: {
                id: dados.professionalId,
            },
        });

        if (!professionalExisting) {
            throw new Error('Professional not found');
        }

        return prisma.availability.create({
            data: dados,
        });
    }

    static async findAll() {
        return prisma.availability.findMany({
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
        return prisma.availability.findUnique({
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
        return prisma.availability.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.availability.delete({
            where: { id },
        });
    }
}

export default AvailabilityService;
