import ScheduleExceptionRepository from '../repositories/scheduleException.repository.js';

class ScheduleExceptionService {
  static async create(data) {
    const { professionalId, startDate, endDate } = data;

    if (!professionalId || !startDate || !endDate) {
      throw Object.assign(new Error('Campos obrigatórios: professionalId, startDate, endDate.'), { status: 400 });
    }

    const professional = await ScheduleExceptionRepository.existsProfessional(professionalId);
    if (!professional) throw Object.assign(new Error('Profissional não encontrado.'), { status: 404 });

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
    if (!exception) throw Object.assign(new Error('Exceção de agenda não encontrada.'), { status: 404 });
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
