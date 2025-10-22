import prisma from '../../prisma/index.js';

class UserRepository {
    async create(userData) {
        return prisma.user.create({ data: userData });
    }

    async findAll() {
        return prisma.user.findMany({
            include: {
                appointments: true,
                professional: true,
                histories: true,
                documents: true,
            },
        });
    }

    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                appointments: true,
                professional: true,
                histories: true,
                documents: true,
            },
        });
    }

    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
            include: {
                professional: true,
                appointments: true,
                histories: true,
                documents: true,
            },
        });
    }
    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }
}

export default new UserRepository();