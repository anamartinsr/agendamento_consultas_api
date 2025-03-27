import prisma from '../../prisma/index.js';

class ProfessionalProcedureService {
    static async create(dados) {
        const professionalExisting = await prisma.professional.findUnique({
            where: {
                id: dados.professionalId,
            },
        });

        if (!professionalExisting) {
            throw new Error('Professional not found');
        }

        const procedureExisting = await prisma.procedure.findUnique({
            where: {
                id: dados.procedureId,
            },
        });

        if (!procedureExisting) {
            throw new Error('Procedure not found');
        }

        return prisma.professionalProcedure.create({
            data: dados,
        });
    }
}

export default ProfessionalProcedureService;
