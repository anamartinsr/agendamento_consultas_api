import { BaseRepository } from './base.repository.js';

export class AppointmentRepository extends BaseRepository {
  async existsUserById(id) { throw new Error('Not implemented'); }
  async existsProfessionalById(id) { throw new Error('Not implemented'); }
}