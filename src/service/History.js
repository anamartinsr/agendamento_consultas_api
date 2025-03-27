import prisma from '../../prisma/index.js';

class HistoryService {
    static async create(dados) {
        const userExisting = await prisma.user.findUnique({
            where: {
                id: dados.userId,
            },
        });

        if (!userExisting) {
            throw new Error('User not found');
        }

        return prisma.history.create({
            data: dados,
        });
    }

    static async findAll() {
        return prisma.history.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                appointment: {
                    select: {
                        description: true,
                        status: true,
                        date: true,
                    },
                },
                procedure: {
                    select: {
                        name: true,
                        price: true,
                        recommendation: true,
                    },
                },
                professional: {
                    select: {
                        specialty: true,
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
        return prisma.history.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                appointment: {
                    select: {
                        description: true,
                        status: true,
                        date: true,
                    },
                },
                procedure: {
                    select: {
                        name: true,
                        price: true,
                        recommendation: true,
                    },
                },
                professional: {
                    select: {
                        specialty: true,
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
}

export default HistoryService;
