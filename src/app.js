import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './lib/swagger-output.json' assert { type: "json" };

import History from './routes/history.js';
import Token from './routes/token.js';
import User from './routes/user.js';
import Professional from './routes/professional.js';
import Procedure from './routes/procedure.js';
import Availability from './routes/availability.js';
import Appointment from './routes/appointment.js';
import Email from './routes/email.js';
import ProfessionalProcedure from './routes/professionalProcedure.js';

const whiteList = [
    process.env.APP_URL_FRONT,
];

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

class App {
    constructor() {
        this.app = express ();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    }

    routes() {
        this.app.use('/history', History);
        this.app.use('/user', User);
        this.app.use('/token', Token);
        this.app.use('/professional', Professional);
        this.app.use('/procedure', Procedure);
        this.app.use('/availability', Availability);
        this.app.use('/appointment', Appointment);
        this.app.use('/email', Email);
        this.app.use('/professionalProcedure', ProfessionalProcedure);
    }
}

export default new App().app;
