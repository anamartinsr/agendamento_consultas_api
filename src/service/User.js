import prisma from '../../prisma/index.js';

class UserService {
    static async create(dados) {
        return prisma.user.create({ data: dados });
    }

    static async findAll() {
        return prisma.user.findMany();
    }

    static async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    static async update(id, dados) {
        return prisma.user.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
}

export default UserService;
