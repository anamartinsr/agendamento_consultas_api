import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import HistoryService from '../service/History.js';

class HistoryController {
  validate(method) {
    switch (method) {
      case 'create':
        return [
          body('userId').notEmpty().withMessage('userId is mandatory'),
          body('appointmentId').notEmpty().withMessage('appointmentId is mandatory'),
          body('procedureId').notEmpty().withMessage('procedureId is mandatory'),
          body('professionalId').notEmpty().withMessage('professionalId is mandatory'),
        ];
    }
  }

  create = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newHistory = await HistoryService.create(req.body);
    res.status(201).json(newHistory);
  });

  index = asyncHandler(async (req, res) => {
    const histories = await HistoryService.findAll();
    res.json(histories);
  });

  show = asyncHandler(async (req, res) => {
    const history = await HistoryService.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ error: 'History not found' });
    }
    res.json(history);
  });
}

export default new HistoryController();
