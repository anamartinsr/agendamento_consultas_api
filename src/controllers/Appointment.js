import AppointmentService from '../service/Appointment.js';
import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';

class AppointmentController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                body('userId').notEmpty().withMessage('userId professionalId is mandatory'),
                body('procedureId').notEmpty().withMessage('procedureId professionalId is mandatory'),
                body('professionalId').notEmpty().withMessage('professionalId professionalId is mandatory'),
            ];
        case 'update':
            return [
                body('userId').optional().notEmpty().withMessage('userId is mandatory'),
                body('procedureId').notEmpty().withMessage('procedureId professionalId is mandatory'),
                body('professionalId').notEmpty().withMessage('professionalId professionalId is mandatory'),
            ];
        }
    }
    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newAppointment = await AppointmentService.create(req.body);
        res.status(201).json(newAppointment);
    });

    index = asyncHandler(async(req, res) => {
        const appointments = await AppointmentService.findAll();
        res.json(appointments);
    });

    show = asyncHandler(async(req, res) => {
        const appointment = await AppointmentService.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(appointment);
    });

    update = asyncHandler(async(req, res) => {
        const appointmentUpdated = await AppointmentService.update(req.params.id, req.body);
        res.json(appointmentUpdated);
    });

    delete = asyncHandler(async(req, res) => {
        await AppointmentService.delete(req.params.id);
        res.status(204).send();
    });

}

export default new AppointmentController();
