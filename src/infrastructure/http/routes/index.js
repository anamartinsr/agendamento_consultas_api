import { Router } from 'express';
// import swaggerUi from "swagger-ui-express";

import Home from './home.route.js';
import History from './appointmentHistory.route.js';
import Token from './token.route.js';
import User from './user.route.js';
import Professional from './professional.route.js';
import Availability from './availability.route.js';
import Appointment from './appointment.route.js';
import Speciality from './specialty.route.js';
import ScheduleException from './scheduleException.route.js';
import MedicalDocument from './medicalDocument.route.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';
// import swaggerSpec from "./docs/swagger.json" assert { type: "json" };


const router = Router();

router.use('/', Home);
router.use('/history', History);
router.use('/tokens', Token);
router.use('/user', User);
router.use('/professional', Professional);
router.use('/availability', Availability);
router.use('/appointment', Appointment);
router.use('/speciality', Speciality);
router.use('/scheduleException', ScheduleException);
router.use('/medicalDocument', MedicalDocument);
// router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;