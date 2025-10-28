import { BaseRepository } from './base.repository.js';

export class UserRepository extends BaseRepository {
  async existsUserByEmail(email) { throw new Error('Not implemented'); } 
}