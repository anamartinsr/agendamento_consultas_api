import prisma from '../../prisma/index.js';

class ScheduleExceptionRepository {
  async create(data) {
    return prisma.scheduleException.create({ data });
  }

  async findAll() {
    return prisma.scheduleException.findMany({ include: { professional: true } });
  }

  async findById(id) {
    return prisma.scheduleException.findUnique({ where: { id }, include: { professional: true } });
  }

  async update(id, data) {
    return prisma.scheduleException.update({ where: { id }, data, include: { professional: true } });
  }

  async delete(id) {
    return prisma.scheduleException.delete({ where: { id } });
  }

  async existsProfessional(id) {
    return prisma.professional.findUnique({ where: { id } });
  }
}

export default new ScheduleExceptionRepository();
