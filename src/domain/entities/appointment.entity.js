import { AppointmentStatus } from '../value-objects/appointment-status.vo.js';
import { DomainError } from '../../shared/error/domain-error.js';

export class Appointment {
  constructor({ id, clientId, professionalId, scheduledAt, notes, status = 'PENDING' }) {
    if (!clientId) throw new DomainError('clientId é obrigatório');
    if (!professionalId) throw new DomainError('professionalId é obrigatório');
    if (!scheduledAt) throw new DomainError('scheduledAt é obrigatório');

    this.id = id;
    this.clientId = clientId;
    this.professionalId = professionalId;
    this.scheduledAt = new Date(scheduledAt);
    this.notes = notes;
    this.status = new AppointmentStatus(status);
  }

  accept() {
    if (!['PENDING', 'REJECTED'].includes(this.status.value)) {
      throw new DomainError(`Não é possível aceitar um agendamento com status ${this.status.value}`);
    }
    this.status = new AppointmentStatus('ACCEPTED');
  }

  cancel() {
    if (this.status.value === 'COMPLETED') {
      throw new DomainError('Não é possível cancelar uma consulta já concluída');
    }
    this.status = new AppointmentStatus('CANCELED');
  }

  complete() {
    if (this.status.value !== 'ACCEPTED') {
      throw new DomainError('Somente consultas aceitas podem ser concluídas');
    }
    this.status = new AppointmentStatus('COMPLETED');
  }
}
