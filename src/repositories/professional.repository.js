import prisma from '../../prisma/index.js';

class ProfessionalRepository {
  static async create(data) {
    return prisma.professional.create({ data });
  }

  static async findAll() {
    return prisma.professional.findMany({
      include: { user: true },
    });
  }

  static async findById(id) {
    return prisma.professional.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  static async update(id, data) {
    return prisma.professional.update({
      where: { id },
      data,
    });
  }

  static async delete(id) {
    return prisma.professional.delete({
      where: { id },
    });
  }

  static async findUserById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }
}

export default ProfessionalRepository;
