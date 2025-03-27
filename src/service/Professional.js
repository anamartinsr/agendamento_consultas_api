import prisma from '../../prisma/index.js';

class ProfessionalService {
    static async create(dados) {
        try {
            const userExisting = await prisma.user.findUnique({
                where: {
                    id: dados.userId,
                },
            });

            if (!userExisting) {
                throw new Error('User not found');
            }

            const professional = await prisma.professional.create({
                data: {
                    specialty: dados.specialty,
                    user: {
                        connect: { id: dados.userId },
                    },
                },
            });

            return professional;
        } catch (e) {
            throw new Error(`Error creating professional: ${e.message}`);
        }
    }

    static async findAll() {
        return prisma.professional.findMany({
            include: {
                user: true,
            },
        });
    }

    static async findById(id) {
        return prisma.professional.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    }

    static async update(id, dados) {
        return prisma.professional.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.professional.delete({
            where: { id },
        });
    }
}

export default ProfessionalService;
