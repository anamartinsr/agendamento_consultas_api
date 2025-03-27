import prisma from '../../prisma/index.js';
import bcrypt from 'bcrypt';
class TokenService {
    async findUserByCPF(cpf) {
        return prisma.user.findUnique({
            where: { cpf },
        });
    }
    async isPasswordValid(password, passwordCripto) {
        if (!password || !passwordCripto) return false;

        return bcrypt.compare(password, passwordCripto);
    }
}

export default new TokenService();
