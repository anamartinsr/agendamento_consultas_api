import AppointmentRepository from '../repository/appointment.repository.js';
import prisma from '../../prisma/index.js';

class AppointmentService {
  static async create(data) {
    const { clientId, professionalId, scheduledAt } = data;

    if (!clientId || !professionalId || !scheduledAt) {
      const error = new Error('Campos obrigatórios: clientId, professionalId, scheduledAt.');
      error.status = 400;
      throw error;
    }

    const client = await prisma.user.findUnique({ where: { id: clientId } });
    if (!client) {
      const error = new Error('Cliente não encontrado.');
      error.status = 404;
      throw error;
    }

    const professional = await prisma.professional.findUnique({ where: { id: professionalId } });
    if (!professional) {
      const error = new Error('Profissional não encontrado.');
      error.status = 404;
      throw error;
    }

    return AppointmentRepository.create({
      clientId,
      professionalId,
      scheduledAt: new Date(scheduledAt),
      notes: data.notes,
      status: data.status,
    });
  }

  static async findAll() {
    return AppointmentRepository.findAll();
  }

  static async findById(id) {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) {
      const error = new Error('Consulta não encontrada.');
      error.status = 404;
      throw error;
    }
    return appointment;
  }

  static async update(id, data) {
    return AppointmentRepository.update(id, data);
  }

  static async delete(id) {
    return AppointmentRepository.delete(id);
  }
}

export default AppointmentService;