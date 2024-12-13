import prisma from '../../prisma/index';

class TokenService {
    async findUserByCPF(cpf) {
        return prisma.user.findUnique({
            where: { cpf },
        });
    }

    async isPasswordValid(user, password) {
        if (!user || !user.senha) return false;
        const bcrypt = await import('bcryptjs'); // Bcrypt pode ser carregado dinamicamente
        return bcrypt.compare(password, user.senha);
    }
}

export default new TokenService();
