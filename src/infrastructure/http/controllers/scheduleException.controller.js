import asyncHandler from 'express-async-handler';
import ScheduleExceptionService from '../../../service/scheduleException.service.js';

class ScheduleExceptionController {
  create = asyncHandler(async (req, res) => {
    const exception = await ScheduleExceptionService.create(req.body);
    res.status(201).json(exception);
  });

  index = asyncHandler(async (req, res) => {
    const exceptions = await ScheduleExceptionService.findAll();
    res.status(200).json(exceptions);
  });

  show = asyncHandler(async (req, res) => {
    const exception = await ScheduleExceptionService.findById(req.params.id);
    res.status(200).json(exception);
  });

  update = asyncHandler(async (req, res) => {
    const exception = await ScheduleExceptionService.update(req.params.id, req.body);
    res.status(200).json(exception);
  });

  delete = asyncHandler(async (req, res) => {
    await ScheduleExceptionService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new ScheduleExceptionController();
