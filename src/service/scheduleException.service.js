import ScheduleExceptionRepository from '../repository/scheduleException.repository.js';
import prisma from '../../prisma/index.js';

class ScheduleExceptionService {
  static async create(data) {
    const { professionalId, startDate, endDate } = data;

    if (!professionalId) {
      const error = new Error('O campo "professionalId" é obrigatório.');
      error.status = 400;
      throw error;
    }

    if (!startDate || !endDate) {
      const error = new Error('Os campos "startDate" e "endDate" são obrigatórios.');
      error.status = 400;
      throw error;
    }

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    if (!professional) {
      const error = new Error('Profissional não encontrado.');
      error.status = 404;
      throw error;
    }

    return ScheduleExceptionRepository.create({
      professionalId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason: data.reason,
      isAvailable: data.isAvailable ?? false,
    });
  }

  static async findAll() {
    return ScheduleExceptionRepository.findAll();
  }

  static async findById(id) {
    const exception = await ScheduleExceptionRepository.findById(id);
    if (!exception) {
      const error = new Error('Exceção de agenda não encontrada.');
      error.status = 404;
      throw error;
    }
    return exception;
  }

  static async update(id, data) {
    return ScheduleExceptionRepository.update(id, data);
  }

  static async delete(id) {
    return ScheduleExceptionRepository.delete(id);
  }
}

export default ScheduleExceptionService;
