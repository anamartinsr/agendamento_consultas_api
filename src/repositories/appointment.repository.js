import prisma from '../../prisma/index.js';

class AppointmentRepository {
  async create(data) {
    return prisma.appointment.create({
      data,
      include: {
        client: true,
        professional: true,
        histories: true,
      },
    });
  }

  async findAll() {
    return prisma.appointment.findMany({
      include: {
        client: true,
        professional: true,
        histories: true,
      },
    });
  }

  async findById(id) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        professional: true,
        histories: true,
      },
    });
  }

  async update(id, data) {
    return prisma.appointment.update({
      where: { id },
      data,
      include: {
        client: true,
        professional: true,
        histories: true,
      },
    });
  }

  async delete(id) {
    return prisma.appointment.delete({
      where: { id },
    });
  }
}

export default new AppointmentRepository();