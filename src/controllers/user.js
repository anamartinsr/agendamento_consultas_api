import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import UserService from '../service/User.js';

class UserController {
    validate(method) {
        switch (method) {
            case 'create':
                return [
                    body('email').isEmail().withMessage('Email inválido'),
                    body('password').notEmpty().withMessage('Password é obrigatório')
                ];
            case 'update':
                return [
                    body('email').optional().isEmail().withMessage('Email inválido'),
                    body('password').optional().notEmpty().withMessage('Password não pode estar vazio')
                ];
        }
    }

    create = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoUser = await UserService.create(req.body);
        res.status(201).json(novoUser);
    });

    index = asyncHandler(async (req, res) => {
        const users = await UserService.findAll();
        res.json(users);
    });

    show = asyncHandler(async (req, res) => {
        const user = await UserService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User não encontrado' });
        }
        res.json(user);
    });

    update = asyncHandler(async (req, res) => {
        const userAtualizado = await UserService.update(req.params.id, req.body);
        res.json(userAtualizado);
    });

    delete = asyncHandler(async (req, res) => {
        await UserService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new UserController();
