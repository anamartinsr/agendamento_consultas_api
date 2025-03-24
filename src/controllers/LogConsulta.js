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

    // index = asyncHandler(async(req, res) => {
    //     const LogConsulta = await LogService.findAll();
    //     res.json(LogConsulta);
    // });

    // show = asyncHandler(async(req, res) => {
    //     const logConsulta = await LogService.findById(req.params.id);
    //     if (!logConsulta) {
    //         return res.status(404).json({ error: 'Log não encontrado' });
    //     }
    //     res.json(logConsulta);
    // });
}

export default new LogConsultaController();
