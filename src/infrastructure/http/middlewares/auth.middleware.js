import TokenService from '../../../service/token.service.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Token não fornecido.');
    error.status = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  req.user = TokenService.verifyToken(token);
  next();
};
