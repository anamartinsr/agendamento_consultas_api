import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProfissionalService from '../service/Professional.js';

class ProfissionalController {
    validate(method) {
        switch (method) {
        case 'create': return [body('usuarioId').notEmpty().withMessage('usuarioId é obrigatório')];
        case 'update': return [body('usuarioId').optional().notEmpty().withMessage('usuarioId não pode estar vazio')];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoProfissional = await ProfissionalService.create(req.body);
        res.status(201).json(novoProfissional);
    });

    index = asyncHandler(async(req, res) => {
        const profissionais = await ProfissionalService.findAll();
        res.json(profissionais);
    });

    show = asyncHandler(async(req, res) => {
        const profissional = await ProfissionalService.findById(req.params.id);
        if (!profissional) {
            return res.status(404).json({ error: 'Profissional não encontrado' });
        }
        res.json(profissional);
    });

    update = asyncHandler(async(req, res) => {
        const profissionalAtualizado = await ProfissionalService.update(req.params.id, req.body);
        res.json(profissionalAtualizado);
    });

    delete = asyncHandler(async(req, res) => {
        await ProfissionalService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new ProfissionalController();
