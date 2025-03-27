import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import TokenService from '../service/Token.js';

class TokenController {
    async store(req, res) {
        const { cpf = '', password = '' } = req.body;

        if (!cpf || !password) {
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        try {
            const user = await TokenService.findUserByCPF(cpf);

            if (!user || !(await TokenService.isPasswordValid(password, user.password))) {
                return res.status(401).json({
                    errors: ['Usuário ou senha inválidos'],
                });
            }

            const { id, name, cpf: userCpf } = user;
            const token = jwt.sign({ id: id.toString(), cpf: userCpf }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            });

            return res.json({ token, user: { name, id, cpf: userCpf } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                errors: ['Erro interno no servidor'],
            });
        }
    }
}

export default new TokenController();
