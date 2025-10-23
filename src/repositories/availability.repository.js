import prisma from '../../prisma/index.js';

class AvailabilityRepository {
  static async create(data) {
    return prisma.availability.create({ data });
  }

  static async findAll() {
    return prisma.availability.findMany({
      include: { professional: true },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  static async findById(id) {
    return prisma.availability.findUnique({
      where: { id },
      include: { professional: true },
    });
  }

  static async findByProfessionalId(professionalId) {
    return prisma.availability.findMany({
      where: { professionalId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  static async findProfessionalById(id) {
    return prisma.professional.findUnique({ where: { id } });
  }

  static async findOverlappingAvailability(professionalId, dayOfWeek, startTime, endTime) {
    return prisma.availability.findFirst({
      where: {
        professionalId,
        dayOfWeek,
        OR: [
          {
            startTime: { lte: endTime },
            endTime: { gte: startTime },
          },
        ],
      },
    });
  }

  static async update(id, data) {
    return prisma.availability.update({
      where: { id },
      data,
    });
  }

  static async delete(id) {
    return prisma.availability.delete({ where: { id } });
  }
}

export default AvailabilityRepository;
