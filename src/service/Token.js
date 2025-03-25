import prisma from '../../prisma/index.js';
import bcrypt from 'bcryptjs';
class TokenService {
    async findUserByCPF(cpf) {
        return prisma.user.findUnique({
            where: { cpf },
        });
    }
    async isSenhaValid(user, senha) {
        if (!user.cpf || !user.senha) return false;
        return bcrypt.compare(senha, user.senha);
    }
}

export default new TokenService();
