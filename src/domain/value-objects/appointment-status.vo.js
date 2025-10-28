import { DomainError } from '../../shared/error/domain-error.js';

export class AppointmentStatus {
  static values = ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELED'];

  constructor(value) {
    if (!AppointmentStatus.values.includes(value)) {
      throw new DomainError(`Status inválido: ${value}`);
    }
    this.value = value;
  }

  equals(other) {
    return other instanceof AppointmentStatus && this.value === other.value;
  }
}
