import { Router } from 'express';
import NotiController from '../controllers/notiController';
import { verifyToken } from '../middlewares/auth';

class NotiRoutes {
    router = Router();
    notiController = new NotiController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/notifications')
            .get(verifyToken, this.notiController.getNotification);
    }
}

export default new NotiRoutes().router;