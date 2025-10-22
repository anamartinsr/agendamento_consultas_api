import asyncHandler from 'express-async-handler';
import MedicalDocumentService from '../service/medicalDocument.service.js';

class MedicalDocumentController {
  create = asyncHandler(async (req, res) => {
    const document = await MedicalDocumentService.create(req.body);
    res.status(201).json(document);
  });

  index = asyncHandler(async (req, res) => {
    const documents = await MedicalDocumentService.findAll();
    res.status(200).json(documents);
  });

  show = asyncHandler(async (req, res) => {
    const document = await MedicalDocumentService.findById(req.params.id);
    res.status(200).json(document);
  });

  update = asyncHandler(async (req, res) => {
    const document = await MedicalDocumentService.update(req.params.id, req.body);
    res.status(200).json(document);
  });

  delete = asyncHandler(async (req, res) => {
    await MedicalDocumentService.delete(req.params.id);
    res.status(204).send();
  });
}

export default new MedicalDocumentController();
