import { Request, Response, Router } from 'express';
import { Application } from 'express';
import userRoute from './user.route';
import postRoute from './post.route';
import commentRoute from './comment.route';
import notiRoute from './noti.route';
import chatRoute from './chat.route';
export default class Routes {
    constructor(app: Application) {
        app.use('/', userRoute);
        app.use('/', postRoute);
        app.use('/', commentRoute);
        app.use('/', notiRoute);
        app.use('/', chatRoute);

    }
}