import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import TokenService from '../service/Token';

class TokenController {
    async store(req, res) {
        const { cpf = '', senha = '' } = req.body;

        if (!cpf || !senha) {
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        try {
            const user = await TokenService.findUserByCPF(cpf);
            if (!user || !(await TokenService.isSenhaValid(user, senha))) {
                return res.status(401).json({
                    errors: ['Usuário ou senha inválidos'],
                });
            }

            const { id, nome } = user;
            const token = jwt.sign({ id: id.toString(), cpf }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            });

            return res.json({ token, user: { nome, id, cpf } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                errors: ['Erro interno no servidor'],
            });
        }
    }
}

export default new TokenController();
