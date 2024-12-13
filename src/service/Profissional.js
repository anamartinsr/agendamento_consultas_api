import prisma from '../../prisma/index';

class ProfissionalService {

    static async create(dados) {
        try {
        // Verificar se o usuário com o 'usuarioId' existe
            const usuarioExistente = await prisma.user.findUnique({
                where: {
                    id: dados.usuarioId,  // Verifique se 'usuarioId' é válido
                },
            });

            if (!usuarioExistente) {
                throw new Error('Usuário não encontrado');
            }

            // Criar o profissional
            const profissionalCriado = await prisma.profissional.create({
                data: {
                    especialidade: dados.especialidade,
                    user: {  // Conectando diretamente o user
                        connect: { id: dados.usuarioId },  // A relação será feita aqui
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
