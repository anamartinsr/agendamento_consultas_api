import DisponibilidadeService from '../service/Disponibilidade';

class DisponibilidadeController {
    async create(req, res) {
        try {
            const dados = req.body;

            if (!dados.profissionalId) {
                return res.status(400).json({ error: 'profissionalId é obrigatório' });
            }
            const novaDisponibilidade = await DisponibilidadeService.create(dados);

            return res.status(201).json(novaDisponibilidade);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async index(req, res) {
        try {
            const disponibilidade = await DisponibilidadeService.findAll();
            return res.json(disponibilidade);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const disponibilidade = await DisponibilidadeService.findById(id);
            if (!disponibilidade) {
                return res.status(404).json({ error: 'Disponibilidade não encontrado' });
            }
            return res.json(disponibilidade);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const disponibilidadeAtualizado = await DisponibilidadeService.update(id, dados);
            return res.json(disponibilidadeAtualizado);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await DisponibilidadeService.delete(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new DisponibilidadeController();
