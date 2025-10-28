import asyncHandler from 'express-async-handler';
import AppointmentHistoryService from '../../../service/appointmentHistory.service.js';

class AppointmentHistoryController {
  create = asyncHandler(async (req, res) => {
    const history = await AppointmentHistoryService.create(req.body);
    res.status(201).json(history);
  });

  index = asyncHandler(async (req, res) => {
    const histories = await AppointmentHistoryService.findAll();
    res.status(200).json(histories);
  });

  show = asyncHandler(async (req, res) => {
    const history = await AppointmentHistoryService.findById(req.params.id);
    res.status(200).json(history);
  });

  update = asyncHandler(async (req, res) => {
    const history = await AppointmentHistoryService.update(req.params.id, req.body);
    res.status(200).json(history);
  });

  delete = asyncHandler(async (req, res) => {
    await AppointmentHistoryService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new AppointmentHistoryController();
