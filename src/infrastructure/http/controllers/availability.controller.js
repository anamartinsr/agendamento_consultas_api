import asyncHandler from 'express-async-handler';
import AvailabilityService from '../../../service/availability.service.js';

class AvailabilityController {
  create = asyncHandler(async (req, res) => {
    const availability = await AvailabilityService.create(req.body);
    res.status(201).json(availability);
  });

  index = asyncHandler(async (req, res) => {
    const availabilities = await AvailabilityService.findAll();
    res.status(200).json(availabilities);
  });

  show = asyncHandler(async (req, res) => {
    const availability = await AvailabilityService.findById(req.params.id);
    res.status(200).json(availability);
  });

  findByProfessional = asyncHandler(async (req, res) => {
    const availabilities = await AvailabilityService.findByProfessional(req.params.professionalId);
    res.status(200).json(availabilities);
  });

  update = asyncHandler(async (req, res) => {
    const updatedAvailability = await AvailabilityService.update(req.params.id, req.body);
    res.status(200).json(updatedAvailability);
  });

  delete = asyncHandler(async (req, res) => {
    await AvailabilityService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new AvailabilityController();
