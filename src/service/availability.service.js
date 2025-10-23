import AvailabilityRepository from '../repositories/availability.repository.js';

class AvailabilityService {
  static async create(data) {
    const { professionalId, dayOfWeek, startTime, endTime } = data;

    if (!professionalId || dayOfWeek === undefined || !startTime || !endTime) {
      const error = new Error('Campos obrigatórios: professionalId, dayOfWeek, startTime, endTime.');
      error.status = 400;
      throw error;
    }

    const professional = await AvailabilityRepository.findProfessionalById(professionalId);
    if (!professional) {
      const error = new Error('Profissional não encontrado.');
      error.status = 404;
      throw error;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      const error = new Error('O horário de início deve ser anterior ao horário de término.');
      error.status = 400;
      throw error;
    }

    const overlapping = await AvailabilityRepository.findOverlappingAvailability(
      professionalId,
      dayOfWeek,
      start,
      end
    );

    if (overlapping) {
      const error = new Error('Já existe uma disponibilidade neste intervalo de tempo.');
      error.status = 409;
      throw error;
    }

    return AvailabilityRepository.create({
      professionalId,
      dayOfWeek,
      startTime: start,
      endTime: end,
    });
  }

  static async findAll() {
    return AvailabilityRepository.findAll();
  }

  static async findById(id) {
    const availability = await AvailabilityRepository.findById(id);
    if (!availability) {
      const error = new Error('Disponibilidade não encontrada.');
      error.status = 404;
      throw error;
    }
    return availability;
  }

  static async findByProfessional(professionalId) {
    return AvailabilityRepository.findByProfessionalId(professionalId);
  }

  static async update(id, data) {
    const existing = await AvailabilityRepository.findById(id);
    if (!existing) {
      const error = new Error('Disponibilidade não encontrada.');
      error.status = 404;
      throw error;
    }

    if (data.startTime && data.endTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      if (start >= end) {
        const error = new Error('O horário de início deve ser anterior ao horário de término.');
        error.status = 400;
        throw error;
      }
    }

    return AvailabilityRepository.update(id, data);
  }

  static async delete(id) {
    const existing = await AvailabilityRepository.findById(id);
    if (!existing) {
      const error = new Error('Disponibilidade não encontrada.');
      error.status = 404;
      throw error;
    }
    return AvailabilityRepository.delete(id);
  }
}

export default AvailabilityService;
