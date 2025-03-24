import ConsultaService from '../service/Consulta.js';
import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

class ConsultaController {
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const novaConsulta = await ConsultaService.create(req.body);
            res.status(201).json(novaConsulta);
        } catch (error) {
            next(error);
        }
    }

    async index(req, res, next) {
        try {
            const consultas = await ConsultaService.findAll();
            res.json(consultas);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        const { id } = req.params;
        try {
            const consulta = await ConsultaService.findById(id);
            if (!consulta) {
                return res.status(404).json({ error: 'Consulta não encontrada' });
            }
            res.json(consulta);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const consultaAtualizada = await ConsultaService.update(id, req.body);
            res.json(consultaAtualizada);
        } catch (error) {
            next(error);
        }
    }
}

export default new ConsultaController();
