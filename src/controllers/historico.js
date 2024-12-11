import Historico from '../models/historico';

class HistoricoController {
    async create(req, res) {
        try {
            const dados = req.body;
            const novoHistorico = await Historico.create(dados);
            return res.status(201).json(novoHistorico);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
    async index(req, res) {
        try {
            const historico = await Historico.findAll();
            return res.json(historico);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const historico = await Historico.findByPk(id);
            if (!historico) {
                return res.status(404).json({ error: 'Histórico não encontrado' });
            }
            return res.json(historico);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new HistoricoController();

