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
        this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    }

    routes() {
        this.app.use('/historico', Historico);
        this.app.use('/user', User);
        this.app.use('/token', Token);
        this.app.use('/profissional', Profissional);
        this.app.use('/procedimento', Procedimento);
        this.app.use('/disponibilidade', Disponibilidade);
        this.app.use('/consulta', Consulta);
        this.app.use('/email', Email);
        this.app.use('/logConsulta', LogConsulta);
        this.app.use('/profissionalProcedimento', ProfissionalProcedimento);
    }
}

export default new App().app;
