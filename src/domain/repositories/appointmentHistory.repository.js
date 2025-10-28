import { BaseRepository } from './base.repository.js';

export class AppointmentHistoryRepository extends BaseRepository {
  async existsAppointmentById(id) { throw new Error('Not implemented'); }
  async existsUserById(id) { throw new Error('Not implemented'); }
  async existsProfessionalById(id) { throw new Error('Not implemented'); }
}