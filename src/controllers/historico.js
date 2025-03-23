import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import HistoricoService from '../service/Historico.js';

class HistoricoController {
    validate(method) {
        switch (method) {
            case 'create':
                return [
                    body('usuariosId').notEmpty().withMessage('usuariosId é obrigatório')
                ];
            case 'update':
                return [
                    body('usuariosId').optional().notEmpty().withMessage('usuariosId não pode estar vazio')
                ];
        }
    }

    create = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoHistorico = await HistoricoService.create(req.body);
        res.status(201).json(novoHistorico);
    });

    index = asyncHandler(async (req, res) => {
        const historicos = await HistoricoService.findAll();
        res.json(historicos);
    });

    show = asyncHandler(async (req, res) => {
        const historico = await HistoricoService.findById(req.params.id);
        if (!historico) {
            return res.status(404).json({ error: 'Histórico não encontrado' });
        }
        res.json(historico);
    });

    update = asyncHandler(async (req, res) => {
        const historicoAtualizado = await HistoricoService.update(req.params.id, req.body);
        res.json(historicoAtualizado);
    });

    delete = asyncHandler(async (req, res) => {
        await HistoricoService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new HistoricoController();
