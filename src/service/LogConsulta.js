import prisma from '../../prisma/index.js';

class LogService {
    static async create(dados) {
        const userExistente = await prisma.user.findUnique({
            where: {
                id: dados.usuariosId,
            },
        });

        if (!userExistente) {
            throw new Error('Usuario não encontrado');
        }

        const profissionalExistente = await prisma.profissional.findUnique({
            where: {
                id: dados.profissionalId,
            },
        });

        if (!profissionalExistente) {
            throw new Error('Profissional não encontrado');
        }

        const procedimentoExistente = await prisma.procedimento.findUnique({
            where: {
                id: dados.procedimentoId,
            },
        });

        if (!procedimentoExistente) {
            throw new Error('Procedimento não encontrado');
        }

        return prisma.logConsulta.create({
            data: dados,
        });
    }
}

export default LogService;
