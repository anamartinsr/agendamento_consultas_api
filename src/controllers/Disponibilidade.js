import { check, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import DisponibilidadeService from '../service/Disponibilidade.js';

class DisponibilidadeController {
    validate(method) {
        switch (method) {
            case 'create':
                return [
                    check('profissionalId', 'profissionalId é obrigatório').notEmpty()
                ];
            default:
                return [];
        }
    }

    create = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const novaDisponibilidade = await DisponibilidadeService.create(req.body);
        res.status(201).json(novaDisponibilidade);
    });

    index = asyncHandler(async (req, res) => {
        const disponibilidades = await DisponibilidadeService.findAll();
        res.json(disponibilidades);
    });

    show = asyncHandler(async (req, res) => {
        const disponibilidade = await DisponibilidadeService.findById(req.params.id);
        if (!disponibilidade) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada' });
        }
        res.json(disponibilidade);
    });

    update = asyncHandler(async (req, res) => {
        const disponibilidadeAtualizada = await DisponibilidadeService.update(req.params.id, req.body);
        res.json(disponibilidadeAtualizada);
    });

    delete = asyncHandler(async (req, res) => {
        await DisponibilidadeService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new DisponibilidadeController();
