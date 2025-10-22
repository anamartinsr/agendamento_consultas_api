import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./docs/swagger.json" assert { type: "json" };

import Home from './routes/home.js';
import History from './routes/history.js';
import Token from './routes/token.js';
import User from './routes/user.route.js';
import Professional from './routes/professional.route.js';
import Procedure from './routes/procedure.js';
import Availability from './routes/availability.js';
import Appointment from './routes/appointment.js';
import Email from './routes/email.js';
import Speciality from './routes/specialty.routes.js';
import ProfessionalProcedure from './routes/professionalProcedure.js';
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
    this.app.use('/procedure', Procedure);
    this.app.use('/availability', Availability);
    this.app.use('/appointment', Appointment);
    this.app.use('/email', Email);
    this.app.use('/speciality', Speciality);
    this.app.use('/professionalProcedure', ProfessionalProcedure);
    this.app.use(errorHandler);
  }
}

export default new App().app;
