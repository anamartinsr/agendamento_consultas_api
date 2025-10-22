import MedicalDocumentRepository from '../repository/medicalDocument.repository.js';
import prisma from '../../prisma/index.js';

class MedicalDocumentService {
  static async create(data) {
    const { userId, title, type, fileUrl } = data;

    if (!userId || !title || !type || !fileUrl) {
      const error = new Error('Campos obrigatórios: userId, title, type, fileUrl.');
      error.status = 400;
      throw error;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    if (data.appointmentId) {
      const appointment = await prisma.appointment.findUnique({
        where: { id: data.appointmentId },
      });
      if (!appointment) {
        const error = new Error('Consulta não encontrada.');
        error.status = 404;
        throw error;
      }
    }

    return MedicalDocumentRepository.create(data);
  }

  static async findAll() {
    return MedicalDocumentRepository.findAll();
  }

  static async findById(id) {
    const document = await MedicalDocumentRepository.findById(id);
    if (!document) {
      const error = new Error('Documento médico não encontrado.');
      error.status = 404;
      throw error;
    }
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
