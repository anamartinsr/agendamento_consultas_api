import { BaseRepository } from './base.repository.js';

export class AvailabilityRepository extends BaseRepository {
  async existsByProfessionalId(professionalId) { throw new Error('Not implemented'); }
  async existsProfessionalById(id) { throw new Error('Not implemented'); }
  async findOverlappingAvailability(professionalId, dayOfWeek, startTime, endTime) { throw new Error('Not implemented'); }
}