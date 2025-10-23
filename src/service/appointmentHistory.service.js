import AppointmentHistoryRepository from '../repository/appointmentHistory.repository.js';

class AppointmentHistoryService {
  static async create(data) {
    const { appointmentId, newStatus, actionByUserId, actionByProfId } = data;

    if (!appointmentId || !newStatus) {
      throw Object.assign(new Error('Campos obrigatórios: appointmentId, newStatus.'), { status: 400 });
    }

    const appointment = await AppointmentHistoryRepository.existsAppointment(appointmentId);
    if (!appointment) throw Object.assign(new Error('Consulta não encontrada.'), { status: 404 });

    if (actionByUserId) {
      const user = await AppointmentHistoryRepository.existsUser(actionByUserId);
      if (!user) throw Object.assign(new Error('Usuário não encontrado.'), { status: 404 });
    }

    if (actionByProfId) {
      const professional = await AppointmentHistoryRepository.existsProfessional(actionByProfId);
      if (!professional) throw Object.assign(new Error('Profissional não encontrado.'), { status: 404 });
    }

    return AppointmentHistoryRepository.create(data);
  }

  static async findAll() {
    return AppointmentHistoryRepository.findAll();
  }

  static async findById(id) {
    const history = await AppointmentHistoryRepository.findById(id);
    if (!history) throw Object.assign(new Error('Histórico não encontrado.'), { status: 404 });
    return history;
  }

  static async update(id, data) {
    return AppointmentHistoryRepository.update(id, data);
  }

  static async delete(id) {
    return AppointmentHistoryRepository.delete(id);
  }
}

export default AppointmentHistoryService;