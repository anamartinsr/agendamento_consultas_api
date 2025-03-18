import HistoricoService from '../service/Historico.js';

class HistoricoController {
    async create(req, res) {
        try {
            const dados = req.body;
            if (!dados.usuariosId) {
                return res.status(400).json({ error: 'usuariosId é obrigatório' });
            }
            const novoHistorico = await HistoricoService.create(dados);
            return res.status(201).json(novoHistorico);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async index(req, res) {
        try {
            const historicos = await HistoricoService.findAll();
            return res.json(historicos);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const historico = await HistoricoService.findById(id);
            if (!historico) {
                return res.status(404).json({ error: 'Histórico não encontrado' });
            }
            return res.json(historico);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const historicoAtualizado = await HistoricoService.update(id, dados);
            return res.json(historicoAtualizado);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await HistoricoService.delete(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new HistoricoController();
