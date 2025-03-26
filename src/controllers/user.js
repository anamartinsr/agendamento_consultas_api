import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import UserService from '../service/User.js';

class UserController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('email').isEmail().withMessage('Email inválido'),
                body('password').notEmpty().withMessage('Password é obrigatório'),
            ];
        case 'update':
            return [
                body('email').optional().isEmail().withMessage('Email inválido'),
                body('password').optional().notEmpty().withMessage('Password não pode estar vazio'),
            ];
        }
    }

    create = asyncHandler(async(req, res) => {
        /*

 test swagger
        #swagger.tags = ['User']
        #swagger.summary = 'Create a new user'
        #swagger.description = 'This endpoint will create a new user'
        #swagger.path = '/users/'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                name: "user",
                idade: 18,
                cpf: "xxx-xxx-xxx-xx",
                email: "user@example.com",
                password: "1234",
                tipoUser: "CLIENTE",
                descricao: "appointments",
                cep: "xxxxx-xxx",
                numero: 10,
                rua: "Rua XYZ",
                cidade: "Cidade ABC",
                telefone: "xx-xxxxx-xxxx",
                senhaAlterada: "false",
            }
        }
    */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            // #swagger.responses[400] = { description: ''}
            // #swagger.responses[404] = { description: ''}
            // #swagger.responses[500] = { description: ''}
        }

        const novoUser = await UserService.create(req.body);
        // #swagger.responses[201] = { description: 'User registered successfully.' }
        res.status(201).json(novoUser);
    });

    index = asyncHandler(async(req, res) => {

        /*
            #swagger.tags = ['User']
            #swagger.summary = 'List all user'
            #swagger.description = 'This endpoint will list all users'
            #swagger.path = '/users/'
            #swagger.method = 'get'
*/
        const users = await UserService.findAll();
        res.json(users);
        // #swagger.responses[200] = { description: 'List of users' }
        // #swagger.responses[400] = { description: ''}
        // #swagger.responses[404] = { description: ''}
        // #swagger.responses[500] = { description: ''}
    });

    show = asyncHandler(async(req, res) => {
        /*
            #swagger.tags = ['User']
            #swagger.summary = 'List a user'
            #swagger.description = 'This endpoint will list a users'
            #swagger.path = '/users/:id'
            #swagger.method = 'get'
*/
        const user = await UserService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User não encontrado' });
        }
        // #swagger.responses[200] = { description: 'List of user' }
        // #swagger.responses[400] = { description: ''}
        // #swagger.responses[404] = { description: 'User not found'}
        // #swagger.responses[500] = { description: ''}
        res.json(user);
    });

    update = asyncHandler(async(req, res) => {
        const userAtualizado = await UserService.update(req.params.id, req.body);
        res.json(userAtualizado);
    });

    delete = asyncHandler(async(req, res) => {
        await UserService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new UserController();
