import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProcedimentoService from '../service/Procedimento.js';

class ProcedimentoController {
    validate(method) {
        switch (method) {
        case 'create':
            return [body('profissionalId').notEmpty().withMessage('profissionalId é obrigatório')];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const novoProcedimento = await ProcedimentoService.create(req.body);
        res.status(201).json(novoProcedimento);
    });

    index = asyncHandler(async(req, res) => {
        const procedimentos = await ProcedimentoService.findAll();
        res.json(procedimentos);
    });

    show = asyncHandler(async(req, res) => {
        const procedimento = await ProcedimentoService.findById(req.params.id);
        if (!procedimento) {
            return res.status(404).json({ error: 'Procedimento não encontrado' });
        }
        res.json(procedimento);
    });

    update = asyncHandler(async(req, res) => {
        const procedimentoAtualizado = await ProcedimentoService.update(req.params.id, req.body);
        res.json(procedimentoAtualizado);
    });

    delete = asyncHandler(async(req, res) => {
        await ProcedimentoService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new ProcedimentoController();
