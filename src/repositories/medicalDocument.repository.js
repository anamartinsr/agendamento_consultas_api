import prisma from '../../prisma/index.js';

class MedicalDocumentRepository {
  async create(data) {
    return prisma.medicalDocument.create({ data });
  }

  async findAll() {
    return prisma.medicalDocument.findMany({
      include: { user: true, appointment: true },
    });
  }

  async findById(id) {
    return prisma.medicalDocument.findUnique({
      where: { id },
      include: { user: true, appointment: true },
    });
  }

  async update(id, data) {
    return prisma.medicalDocument.update({
      where: { id },
      data,
      include: { user: true, appointment: true },
    });
  }

  async delete(id) {
    return prisma.medicalDocument.delete({ where: { id } });
  }

  async existsUser(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async existsAppointment(id) {
    return prisma.appointment.findUnique({ where: { id } });
  }
}

export default new MedicalDocumentRepository();
