import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserRepository from '../repositories/user.repository.js';

dotenv.config();

class TokenService {
  static async authenticate(email, password) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const error = new Error('Senha inválida.');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || '1d' }
    );

    const { passwordHash, ...safeUser } = user;
    return { token, user: safeUser };
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      const error = new Error('Token inválido ou expirado.');
      error.status = 401;
      throw error;
    }
  }
}

export default TokenService;
