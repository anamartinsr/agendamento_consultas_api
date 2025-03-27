import ConsultaService from '../service/Appointment.js';
import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';

class ConsultaController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('usuariosId').notEmpty().withMessage('usuariosId é obrigatório'),
                body('procedimentoId').notEmpty().withMessage('procedimentoId é obrigatório'),
                body('profissionalId').notEmpty().withMessage('profissionalId é obrigatório'),
            ];
        case 'update':
            return [
                body('usuariosId').optional().notEmpty().withMessage('usuariosId não pode estar vazio'),
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

        const novoConsulta = await ConsultaService.create(req.body);
        res.status(201).json(novoConsulta);
    });

    index = asyncHandler(async(req, res) => {
        const consultas = await ConsultaService.findAll();
        res.json(consultas);
    });

    show = asyncHandler(async(req, res) => {
        const consulta = await ConsultaService.findById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ error: 'Consulta não encontrado' });
        }
        res.json(consulta);
    });

    update = asyncHandler(async(req, res) => {
        const consultaAtualzada = await ConsultaService.update(req.params.id, req.body);
        res.json(consultaAtualzada);
    });

    delete = asyncHandler(async(req, res) => {
        await ConsultaService.delete(req.params.id);
        res.status(204).send();
    });

}

export default new ConsultaController();
