import asyncHandler from 'express-async-handler';
import AppointmentService from '../service/appointment.service.js';

class AppointmentController {
  create = asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.create(req.body);
    res.status(201).json(appointment);
  });

  index = asyncHandler(async (req, res) => {
    const appointments = await AppointmentService.findAll();
    res.status(200).json(appointments);
  });

  show = asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.findById(req.params.id);
    res.status(200).json(appointment);
  });

  update = asyncHandler(async (req, res) => {
    const appointment = await AppointmentService.update(req.params.id, req.body);
    res.status(200).json(appointment);
  });

  delete = asyncHandler(async (req, res) => {
    await AppointmentService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new AppointmentController();