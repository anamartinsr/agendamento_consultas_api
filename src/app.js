import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./docs/swagger.json" assert { type: "json" };

import Home from './routes/home.route.js';
import History from './routes/appointmentHistory.route.js';
import Token from './routes/token.route.js';
import User from './routes/user.route.js';
import Professional from './routes/professional.route.js';
import Availability from './routes/availability.route.js';
import Appointment from './routes/appointment.route.js';
import Speciality from './routes/specialty.route.js';
import ScheduleException from './routes/scheduleException.route.js';
import MedicalDocument from './routes/medicalDocument.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const whiteList = [
  process.env.URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
  //  this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  routes() {
    this.app.use('/', Home);
    this.app.use('/history', History);
    this.app.use('/user', User);
    this.app.use('/tokens', Token);
    this.app.use('/professional', Professional);
    this.app.use('/availability', Availability);
    this.app.use('/appointment', Appointment);
    this.app.use('/speciality', Speciality);
    this.app.use('/medicalDocument', MedicalDocument);
    this.app.use('/scheduleException', ScheduleException);
    this.app.use(errorHandler);
  }
}

export default new App().app;
