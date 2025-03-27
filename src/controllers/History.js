import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import HistoricoService from '../service/History.js';

class HistoricoController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('usuariosId').notEmpty().withMessage('usuariosId é obrigatório'),
                body('consultaId').notEmpty().withMessage('consultaId é obrigatório'),
                body('procedimentoId').notEmpty().withMessage('procedimentoId é obrigatório'),
                body('profissionalId').notEmpty().withMessage('profissionalId é obrigatório'),
            ];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoHistorico = await HistoricoService.create(req.body);
        res.status(201).json(novoHistorico);
    });

    index = asyncHandler(async(req, res) => {
        const historicos = await HistoricoService.findAll();
        res.json(historicos);
    });

    show = asyncHandler(async(req, res) => {
        const historico = await HistoricoService.findById(req.params.id);
        if (!historico) {
            return res.status(404).json({ error: 'Histórico não encontrado' });
        }
        res.json(historico);
    });
}

export default new HistoricoController();
