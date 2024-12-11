import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user';

class TokenController {
    async store(req, res) {
        const { cpf = '', password = ''} = req.body;
        if (!cpf || !password) {
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }
        const user = await User.findOne({ where: { cpf } });
        if (!user) {
            return res.status(401).json({
                errors: ['Usuário não existe'],
            });
        }
        if (!(await user.passwordIsValid(password))) {
            return res.status(401).json({
                errors: ['Senha inválida'],
            });
        }
        const { id } = user;
        const token = jwt.sign( {id, cpf }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });
        return res.json({ token, user: { nome: user.nome, id, cpf } });
    }
}

export default new TokenController();
