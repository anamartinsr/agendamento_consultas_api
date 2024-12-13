import prisma from '../../prisma/index';

class HistoricoService {
    static async create(dados) {
        return prisma.historico.create({ data: dados });
    }

    static async findAll() {
        return prisma.historico.findMany({
            include: {
                cliente: true,
                user: true,
            },
        });
    }

    static async findById(id) {
        return prisma.historico.findUnique({
            where: { id },
            include: {
                cliente: true,
                user: true,
            },
        });
    }
}

export default HistoricoService;
