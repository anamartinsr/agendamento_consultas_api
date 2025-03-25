import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' assert { type: "json" };

import Historico from './routes/historico.js';
import Token from './routes/token.js';
import User from './routes/user.js';
import Profissional from './routes/profissional.js';
import Procedimento from './routes/procedimento.js';
import Disponibilidade from './routes/disponibilidade.js';
import Consulta from './routes/consulta.js';
import Email from './routes/email.js';
import LogConsulta from './routes/logConsulta.js';
import ProfissionalProcedimento from './routes/profissionalProcedimento.js';

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
        this.app.use('/history', Historico);
        this.app.use('/user', User);
        this.app.use('/token', Token);
        this.app.use('/professional', Profissional);
        this.app.use('/procedure', Procedimento);
        this.app.use('/availability', Disponibilidade);
        this.app.use('/appointment', Consulta);
        this.app.use('/email', Email);
        this.app.use('/logAppointment', LogConsulta);
        this.app.use('/professionalProcedure', ProfissionalProcedimento);
    }
}

export default new App().app;
