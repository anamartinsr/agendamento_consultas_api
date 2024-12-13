import prisma from '../../prisma/index';

class DisponibilidadeService {
    static async create(dados) {
    // Validação se o usuariosId existe no banco de dados
        const profissionalExistente = await prisma.profissional.findUnique({
            where: {
                id: dados.profissionalId,  // Verifica se o ID do usuário existe
            },
        });

        // Se o usuário não for encontrado, lançar erro
        if (!profissionalExistente) {
            throw new Error('Profissional não encontrado');
        }

        // Se o usuário existe, cria a
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
