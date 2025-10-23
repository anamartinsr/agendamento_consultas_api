import SpecialtyRepository from '../repositories/specialty.repository.js';

class SpecialtyService {
  static async create(data) {
    if (!data.name) {
      const error = new Error('O campo "name" é obrigatório.');
      error.status = 400;
      throw error;
    }

    return SpecialtyRepository.create(data);
  }

  static async findAll() {
    return SpecialtyRepository.findAll();
  }

  static async findById(id) {
    const specialty = await SpecialtyRepository.findById(id);
    if (!specialty) {
      const error = new Error('Especialidade não encontrada.');
      error.status = 404;
      throw error;
    }
    return specialty;
  }

  static async update(id, data) {
    return SpecialtyRepository.update(id, data);
  }

  static async delete(id) {
    return SpecialtyRepository.delete(id);
  }
}

export default SpecialtyService;
