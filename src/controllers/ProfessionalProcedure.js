import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import ProfessonalProcedureService from '../service/ProfessionalProcedure.js';

class ProfessionalProcedureController {
  validate(method) {
    switch (method) {
      case 'create':
        return [
          body('professionalId').notEmpty().withMessage('professionalId is mandatory'),
          body('procedureId').notEmpty().withMessage('procedureId is mandatory'),
        ];
    }
  }

  create = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProfessionalProcedure = await ProfessonalProcedureService.create(req.body);
    res.status(201).json(newProfessionalProcedure);
  });
}

export default new ProfessionalProcedureController();
