import { BaseRepository } from './base.repository.js';

export class MedicalDocumentRepository extends BaseRepository {
  async existsUserById(id) { throw new Error('Not implemented'); }
  async existsAppointmentById(id) { throw new Error('Not implemented'); }
}
