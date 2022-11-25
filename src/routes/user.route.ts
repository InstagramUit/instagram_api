import { Router } from 'express';
import UserController from '../controllers/userController';
import { verifyId } from '../middlewares/auth';
class UserRoutes {
    router = Router();
    userController = new UserController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/')
            .get(this.userController.getHome);
        this.router.route('/login')
            .post(this.userController.login);
        this.router.route('/sign-up')
            .post(this.userController.signUp);
        this.router.route('/users')
            .put(verifyId,this.userController.updateInfoUser);
        this.router.route('/users/forgot-password')
            .put(verifyId,this.userController.forgotPassword);

    }
}

export default new UserRoutes().router;