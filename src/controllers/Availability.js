import { check, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import AvailabilityService from '../service/Availability.js';

class AvailabilityController {
    validate(method) {
        switch (method) {
        case 'create':
            return [
                check('professionalId', 'professionalId is mandatory').notEmpty(),
            ];
        default:
            return [];
        }
    }

    create = asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newAvailability = await AvailabilityService.create(req.body);
        res.status(201).json(newAvailability);
    });

    index = asyncHandler(async(req, res) => {
        const availabilities = await AvailabilityService.findAll();
        res.json(availabilities);
    });

    show = asyncHandler(async(req, res) => {
        const availability = await AvailabilityService.findById(req.params.id);
        if (!availability) {
            return res.status(404).json({ error: 'Availability not found' });
        }
        res.json(availability);
    });

    update = asyncHandler(async(req, res) => {
        const availabilityUpdated = await AvailabilityService.update(req.params.id, req.body);
        res.json(availabilityUpdated);
    });

    delete = asyncHandler(async(req, res) => {
        await AvailabilityService.delete(req.params.id);
        res.status(204).send();
    });
}

export default new AvailabilityController();
