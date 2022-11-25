import { Request, Response, Router } from 'express';
import { Application } from 'express';
import userRoute from './user.route';
import postRoute from './post.route';
export default class Routes {
    constructor(app: Application) {
        app.use('/', userRoute);
        app.use('/', postRoute);
    }
}