import express from 'express';
import loginRoutes from './src/routes/loginRoutes.js';

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
        this.app.use('/', loginRoutes);
    }
}

export default new App().app;
