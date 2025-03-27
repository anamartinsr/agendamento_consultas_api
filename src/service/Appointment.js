import prisma from '../../prisma/index.js';

class AppointmentService {
    static async create(dados) {
        const userExisting = await prisma.user.findUnique({
            where: {
                id: dados.userId,
            },
        });

        if (!userExisting) {
            throw new Error('User not found');
        }

        const professionalExisting = await prisma.professional.findUnique({
            where: {
                id: dados.professionalId,
            },
        });

        if (!professionalExisting) {
            throw new Error('Professional not found');
        }

        const procedureExisting = await prisma.procedure.findUnique({
            where: {
                id: dados.procedimentoId,
            },
        });

        if (!procedureExisting) {
            throw new Error('Procedure not found');
        }

        return prisma.appointment.create({
            data: dados,
        });
    }

    static async findAll() {
        return prisma.appointment.findMany({
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
                procedure: true,
            },
        });
    }

    static async findById(id) {
        return prisma.appointment.findUnique({
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
                procedimento: true,
            },
        });
    }

    static async update(id, dados) {
        return prisma.appointment.update({
            where: { id },
            data: dados,
        });
    }
    static async delete(id) {
        return prisma.appointment.delete({
            where: { id },
        });
    }
}

export default AppointmentService;
