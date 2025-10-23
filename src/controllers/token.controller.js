import asyncHandler from 'express-async-handler';
import TokenService from '../service/token.service.js';

class TokenController {
  store = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('E-mail e senha são obrigatórios.');
      error.status = 400;
      throw error;
    }

    const { token, user } = await TokenService.authenticate(email, password);

    res.status(200).json({
      message: 'Autenticação realizada com sucesso.',
      token,
      user,
    });
  });
}

export default new TokenController();
