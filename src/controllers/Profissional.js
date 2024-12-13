import ProfissonalService from '../service/Profissional';

class ProfissionalController {
    async create(req, res) {
        try {
        // Obtém os dados da requisição
            const dados = req.body;

            // Verificar se 'usuarioId' foi passado corretamente
            if (!dados.usuarioId) {
                return res.status(400).json({ error: 'usuarioId é obrigatório' });
            }
            // Passa os dados para o serviço de criação do profissional
            const novoProfissional = await ProfissonalService.create(dados);

            // Retorna o novo profissional criado
            return res.status(201).json(novoProfissional);
        } catch (e) {
        // Se houver erro, retorna o erro
            return res.status(400).json({ error: e.message });
        }
    }

    async index(req, res) {
        try {
            const profissional = await ProfissonalService.findAll();
            return res.json(profissional);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const profissional = await ProfissonalService.findById(id);
            if (!profissional) {
                return res.status(404).json({ error: 'Profissional não encontrado' });
            }
            return res.json(profissional);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const profissionalAtualizado = await ProfissonalService.update(id, dados);
            return res.json(profissionalAtualizado);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ProfissonalService.delete(id);
            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new ProfissionalController();
