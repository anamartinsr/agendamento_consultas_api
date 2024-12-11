import Cliente from '../models/cliente';

class ClienteController {
    async create(req, res) {
        try {
            const dados = req.body;
            const novoCliente = await Cliente.create(dados);
            return res.status(201).json(novoCliente);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async index(req, res) {
        try {
            const cliente = await Cliente.findAll();
            return res.json(cliente);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.json(cliente);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}
export default new ClienteController();

