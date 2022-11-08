import { Request, Response, Router } from 'express';
import { Application } from 'express';
import Route from './Route';
export default class Routes {
    constructor(app: Application) {
      // course reoutes
      app.use('/', Route);
    }
  }