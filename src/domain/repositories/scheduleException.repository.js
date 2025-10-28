import { BaseRepository } from './base.repository.js';

export class ScheduleExceptionRepository extends BaseRepository {
  async existsProfessionalById(id) { throw new Error('Not implemented'); } 
}