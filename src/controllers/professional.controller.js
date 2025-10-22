import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProfessionalService from '../service/professional.service.js';

class ProfessionalController {
    validate(method) {
        switch (method) {
            case 'create': return [body('userId').notEmpty().withMessage('userId is mandatory')];
            case 'update': return [body('userId').optional().notEmpty().withMessage('userId is mandatory')];
        }
    }

    create = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newProfessional = await ProfessionalService.create(req.body);
        res.status(201).json(newProfessional);
    });

    index = asyncHandler(async (req, res) => {
        const professionals = await ProfessionalService.findAll();
        res.status(200).json(professionals);
    });

    show = asyncHandler(async (req, res) => {
        const professional = await ProfessionalService.findById(req.params.id);
        if (!professional) {
            const error = new Error('Profissional não encontrado');
            error.status = 404;
            throw error;
        }

        res.json(professional);
    });

    update = asyncHandler(async (req, res) => {
        const professionalUpdated = await ProfessionalService.update(req.params.id, req.body);
        res.status(200).json(professionalUpdated);
    });

    delete = asyncHandler(async (req, res) => {
        await ProfessionalService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new ProfessionalController();
