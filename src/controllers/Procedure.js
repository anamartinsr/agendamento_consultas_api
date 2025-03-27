import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProcedureService from '../service/Procedure.js';

class ProcedureController {
    validate(method) {
        switch (method) {
        case 'create':
            return [body('professionalId').notEmpty().withMessage('professionalId is mandatory')];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newProcedure = await ProcedureService.create(req.body);
        res.status(201).json(newProcedure);
    });

    index = asyncHandler(async(req, res) => {
        const procedures = await ProcedureService.findAll();
        res.json(procedures);
    });

    show = asyncHandler(async(req, res) => {
        const procedure = await ProcedureService.findById(req.params.id);
        if (!procedure) {
            return res.status(404).json({ error: 'Procedure não encontrado' });
        }
        res.json(procedure);
    });

    update = asyncHandler(async(req, res) => {
        const procedureUpdated = await ProcedureService.update(req.params.id, req.body);
        res.json(procedureUpdated);
    });

    delete = asyncHandler(async(req, res) => {
        await ProcedureService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new ProcedureController();
