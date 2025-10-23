import prisma from '../../prisma/index.js';

class AppointmentHistoryRepository {
  async create(data) {
    return prisma.appointmentHistory.create({ data });
  }

  async findAll() {
    return prisma.appointmentHistory.findMany({
      include: {
        appointment: true,
        user: true,
        professional: true,
      },
    });
  }

  async findById(id) {
    return prisma.appointmentHistory.findUnique({
      where: { id },
      include: {
        appointment: true,
        user: true,
        professional: true,
      },
    });
  }

  async update(id, data) {
    return prisma.appointmentHistory.update({
      where: { id },
      data,
      include: {
        appointment: true,
        user: true,
        professional: true,
      },
    });
  }

  async delete(id) {
    return prisma.appointmentHistory.delete({ where: { id } });
  }

  async existsAppointment(id) {
    return prisma.appointment.findUnique({ where: { id } });
  }

  async existsUser(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async existsProfessional(id) {
    return prisma.professional.findUnique({ where: { id } });
  }
}

export default new AppointmentHistoryRepository();
