import asyncHandler from 'express-async-handler';
import UserService from '../../../service/user.service.js';

class UserController {
  create = asyncHandler(async (req, res) => {
    const user = await UserService.create(req.body);

    const { passwordHash, ...safeUser } = user;
    res.status(201).json(safeUser);
  });

  index = asyncHandler(async (req, res) => {
    const users = await UserService.findAll();

    const safeUsers = users.map(({ passwordHash, ...user }) => user);
    res.status(200).json(safeUsers);
  });

  show = asyncHandler(async (req, res) => {
    const user = await UserService.findById(req.params.id);
    if (!user) throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });

    const { passwordHash, ...safeUser } = user;
    res.status(200).json(safeUser);
  });

  update = asyncHandler(async (req, res) => {
    const user = await UserService.update(req.params.id, req.body);
    const { passwordHash, ...safeUser } = user;
    res.status(200).json(safeUser);
  });

  delete = asyncHandler(async (req, res) => {
    await UserService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new UserController();
