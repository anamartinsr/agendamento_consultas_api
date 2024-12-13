import express from 'express';
import Historico from './src/routes/historico.js';
import Token from './src/routes/token.js';
import User from './src/routes/user.js';
import Profissional from './src/routes/profissional.js';
import Procedimento from './src/routes/procedimento.js';
import Disponibilidade from './src/routes/disponibilidade.js';
import Consulta from './src/routes/consulta.js';
class App {
    constructor() {
        this.app = express ();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
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
