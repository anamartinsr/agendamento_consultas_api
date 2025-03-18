import ConsultaService from '../service/Consulta.js';
class ConsultaController {
    async create(req, res) {
        try {
            const dados = req.body;

            if (!dados.usuariosId) {
                return res.status(400).json({ error: 'usuariosId é obrigatório' });
            }
            if (!dados.profissionalId) {
                return res.status(400).json({ error: 'profissionalId é obrigatório' });
            }
            if (!dados.procedimentoId) {
                return res.status(400).json({ error: 'procedimentoId é obrigatório' });
            }
            const novaConsulta = await ConsultaService.create(dados);

            return res.status(201).json(novaConsulta);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async index(req, res) {
        try {
            const consulta = await ConsultaService.findAll();
            return res.json(consulta);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const consulta = await ConsultaService.findById(id);
            if (!consulta) {
                return res.status(404).json({ error: 'Consulta não encontrado' });
            }
            return res.json(consulta);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const ConsultaAtualizado = await ConsultaService.update(id, dados);
            return res.json(ConsultaAtualizado);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ConsultaService.delete(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new ConsultaController();
