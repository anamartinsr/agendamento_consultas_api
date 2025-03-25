import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import LogService from '../service/LogConsulta.js';

class LogConsultaController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('usuariosId').notEmpty().withMessage('usuariosId é obrigatório'),
                body('consultaId').notEmpty().withMessage('consultaId é obrigatório'),
            ];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const novoLog = await LogService.create(req.body);
        res.status(201).json(novoLog);
    });
}

export default new LogConsultaController();
