import asyncHandler from 'express-async-handler';
import SpecialtyService from '../../../service/specialty.service.js';

class SpecialtyController {
  create = asyncHandler(async (req, res) => {
    const specialty = await SpecialtyService.create(req.body);
    res.status(201).json(specialty);
  });

  index = asyncHandler(async (req, res) => {
    const specialties = await SpecialtyService.findAll();
    res.status(200).json(specialties);
  });

  show = asyncHandler(async (req, res) => {
    const specialty = await SpecialtyService.findById(req.params.id);
    res.status(200).json(specialty);
  });

  update = asyncHandler(async (req, res) => {
    const specialty = await SpecialtyService.update(req.params.id, req.body);
    res.status(200).json(specialty);
  });

  delete = asyncHandler(async (req, res) => {
    await SpecialtyService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new SpecialtyController();