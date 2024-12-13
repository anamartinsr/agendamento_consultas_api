import prisma from '../../prisma/index';

class ProcedimentoService {
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

        // Se o usuário existe, cria o cliente
        return prisma.procedimento.create({
            data: dados,
        });
    }

    static async findAll() {
        return prisma.procedimento.findMany({
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
        return prisma.procedimento.findUnique({
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
        return prisma.procedimento.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.procedimento.delete({
            where: { id },
        });
    }
}

export default ProcedimentoService;
