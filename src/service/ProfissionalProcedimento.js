import prisma from '../../prisma/index.js';

class ProfissionalProcedimentoService {
    /**
     * Cria um novo registro profissionalProcedimento no banco de dados.
     *
     * @param {Object} dados - Dados do profissionalProcedimento a ser criado.
     * @returns {Promise<Object>} - profissionalProcedimento criado.
     * @throws {Error} - profissional ou procedimento não for encontrado.
     */
    static async create(dados) {
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

        return prisma.profissionalProcedimento.create({
            data: dados,
        });
    }
}

export default ProfissionalProcedimentoService;
