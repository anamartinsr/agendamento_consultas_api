import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProfissonalProcedimentoService from '../service/ProfessionalProcedure.js';

class ProfissionalProcedimentoController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('profissionalId').notEmpty().withMessage('profissionalId é obrigatório'),
                body('procedimentoId').notEmpty().withMessage('procedimentoId é obrigatório'),
            ];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoProfissionalProcedimento = await ProfissonalProcedimentoService.create(req.body);
        res.status(201).json(novoProfissionalProcedimento);
    });
}

export default new ProfissionalProcedimentoController();
