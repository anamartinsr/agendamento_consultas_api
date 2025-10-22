import ProfessionalRepository from '../repositories/professional.repository.js';

class ProfessionalService {
  static async create(data) {
    const userExisting = await ProfessionalRepository.findUserById(data.userId);

    if (!userExisting) {
      throw new Error('User not found');
    }

    const professional = await ProfessionalRepository.create({
      specialty: data.specialty,
      user: { connect: { id: data.userId } },
    });

    return professional;
  }

  static async findAll() {
    return ProfessionalRepository.findAll();
  }

  static async findById(id) {
    return ProfessionalRepository.findById(id);
  }

  static async update(id, data) {
    return ProfessionalRepository.update(id, data);
  }

  static async delete(id) {
    return ProfessionalRepository.delete(id);
  }
}

export default ProfessionalService;
