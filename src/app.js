import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import Historico from './src/routes/historico.js';
import Token from './src/routes/token.js';
import User from './src/routes/user.js';
import Profissional from './src/routes/profissional.js';
import Procedimento from './src/routes/procedimento.js';
import Disponibilidade from './src/routes/disponibilidade.js';
import Consulta from './src/routes/consulta.js';

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
    }

    routes() {
        this.app.use('/historico', Historico);
        this.app.use('/user', User);
        this.app.use('/token', Token);
        this.app.use('/profissional', Profissional);
        this.app.use('/procedimento', Procedimento);
        this.app.use('/disponibilidade', Disponibilidade);
        this.app.use('/consulta', Consulta);
    }
}

export default new App().app;
