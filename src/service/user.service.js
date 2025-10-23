import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

class UserService {
  static SALT_ROUNDS = 10;

  static async hashPassword(password) {
    return bcrypt.hash(password, UserService.SALT_ROUNDS);
  }

  static async create(dados) {
    const hashedPassword = await this.hashPassword(dados.passwordHash);

    const userToCreate = {
      ...dados,
      passwordHash: hashedPassword,
    };

    return UserRepository.create(userToCreate);
  }

  static async findAll() {
    return UserRepository.findAll();
  }

  static async findById(id) {
    return UserRepository.findById(id);
  }

  static async update(id, dados) {
    return UserRepository.update(id, dados);
  }

  static async delete(id) {
    return UserRepository.delete(id);
  }
}

export default UserService;
