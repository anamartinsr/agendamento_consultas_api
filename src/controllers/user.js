import UserService from '../service/User.js';

class UserController {
    async create(req, res) {
        try {
            const dados = req.body;
            const novoUser = await UserService.create(dados);
            return res.status(201).json(novoUser);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async index(req, res) {
        try {
            const users = await UserService.findAll();
            return res.json(users);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User não encontrado' });
            }
            return res.json(user);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const userAtualizado = await UserService.update(id, dados);
            return res.json(userAtualizado);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await UserService.delete(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new UserController();
