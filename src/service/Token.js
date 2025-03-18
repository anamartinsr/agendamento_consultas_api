import prisma from '../../prisma/index';

class TokenService {
    /**
     * Encontra um usuário pelo CPF.
     *
     * @param {string} cpf - CPF do usuário.
     * @returns {Promise<Object|null>} - Usuário encontrado ou null se não existir.
     */
    async findUserByCPF(cpf) {
        return prisma.user.findUnique({
            where: { cpf },
        });
    }

    /**
     * Verifica se a senha fornecida é válida para o usuário.
     *
     * @param {Object} user - Usuário com CPF e senha.
     * @param {string} senha - Senha a ser verificada.
     * @returns {Promise<boolean>} - True se a senha for válida, false caso contrário.
     */
    async isSenhaValid(user, senha) {
        if (!user.cpf || !user.senha) return false;
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(senha, user.senha);
    }
}

export default new TokenService();
