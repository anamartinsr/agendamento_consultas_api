import { BaseRepository } from './base.repository.js';

export class ProfessionalRepository extends BaseRepository{
  async existsUserById(userId) { throw new Error('Not implemented'); }
}