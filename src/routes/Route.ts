import { Router } from 'express';
import UserController from '../controllers/userController';

class Routes {
    router = Router();
    userController = new UserController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/')
            .get(this.userController.getHome);
       
    }
}

export default new Routes().router;