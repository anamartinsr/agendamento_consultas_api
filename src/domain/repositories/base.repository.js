export class BaseRepository {
  async create(data) {
    throw new Error('Method not implemented.');
  }

  async findAll(params = {}) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    throw new Error('Method not implemented.');
  }

  async update(id, data) {
    throw new Error('Method not implemented.');
  }

  async delete(id) {
    throw new Error('Method not implemented.');
  }
}
