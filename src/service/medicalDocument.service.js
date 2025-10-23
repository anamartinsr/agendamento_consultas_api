import MedicalDocumentRepository from '../repository/medicalDocument.repository.js';

class MedicalDocumentService {
  static async create(data) {
    const { userId, title, type, fileUrl, appointmentId } = data;

    if (!userId || !title || !type || !fileUrl) {
      throw Object.assign(new Error('Campos obrigatórios: userId, title, type, fileUrl.'), { status: 400 });
    }

    const user = await MedicalDocumentRepository.existsUser(userId);
    if (!user) throw Object.assign(new Error('Usuário não encontrado.'), { status: 404 });

    if (appointmentId) {
      const appointment = await MedicalDocumentRepository.existsAppointment(appointmentId);
      if (!appointment) throw Object.assign(new Error('Consulta não encontrada.'), { status: 404 });
    }

    return MedicalDocumentRepository.create(data);
  }

  static async findAll() {
    return MedicalDocumentRepository.findAll();
  }

  static async findById(id) {
    const document = await MedicalDocumentRepository.findById(id);
    if (!document) throw Object.assign(new Error('Documento médico não encontrado.'), { status: 404 });
    return document;
  }

  static async update(id, data) {
    return MedicalDocumentRepository.update(id, data);
  }

  static async delete(id) {
    return MedicalDocumentRepository.delete(id);
  }
}

export default MedicalDocumentService;
