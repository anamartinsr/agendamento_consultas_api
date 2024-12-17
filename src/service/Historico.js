import prisma from '../../prisma/index';

class HistoricoService {
    static async create(dados) {
        const userExistente = await prisma.user.findUnique({
            where: {
                id: dados.usuariosId,
            },
        });

        if (!userExistente) {
            throw new Error('user não encontrado');
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
            },
        });
    }

    static async update(id, dados) {
        return prisma.historico.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.historico.delete({
            where: { id },
        });
    }
}

export default HistoricoService;
