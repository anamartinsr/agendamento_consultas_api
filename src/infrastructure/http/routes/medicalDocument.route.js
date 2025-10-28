import { Router } from 'express';
import MedicalDocumentController from '../controllers/medicalDocument.controller.js';

const router = new Router();

router.post('/', MedicalDocumentController.create);
router.get('/', MedicalDocumentController.index);
router.get('/:id', MedicalDocumentController.show);
router.put('/:id', MedicalDocumentController.update);
router.delete('/:id', MedicalDocumentController.delete);

export default router;
