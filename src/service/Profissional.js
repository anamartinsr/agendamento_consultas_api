import prisma from '../../prisma/index.js';

class ProfissionalService {
    static async create(dados) {
        try {
            const usuarioExistente = await prisma.user.findUnique({
                where: {
                    id: dados.usuarioId,
                },
            });

            if (!usuarioExistente) {
                throw new Error('Usuário não encontrado');
            }

            const profissionalCriado = await prisma.profissional.create({
                data: {
                    especialidade: dados.especialidade,
                    user: {
                        connect: { id: dados.usuarioId },
                    },
                },
            });

            return profissionalCriado;
        } catch (e) {
            throw new Error(`Erro ao criar profissional: ${e.message}`);
        }
    }

    static async findAll() {
        return prisma.profissional.findMany({
            include: {
                user: true,
            },
        });
    }

    static async findById(id) {
        return prisma.profissional.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    }

    static async update(id, dados) {
        return prisma.profissional.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.profissional.delete({
            where: { id },
        });
    }
}

export default ProfissionalService;
