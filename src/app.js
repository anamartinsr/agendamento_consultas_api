import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './infrastructure/http/routes/index.js';

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
  }

  routes() {
    this.app.use('/api', routes);
  }
}

export default new App().app;
