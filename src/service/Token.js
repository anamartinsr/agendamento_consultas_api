import prisma from '../../prisma/index';

class TokenService {
    async findUserByCPF(cpf) {
        return prisma.user.findUnique({
            where: { cpf },
        });
    }

    async isSenhaValid(user, senha) {
        if (!user.cpf || !user.senha) return false;
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(senha, user.senha);
    }
}

export default new TokenService();
