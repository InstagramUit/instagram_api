import { Router } from 'express';
import UserController from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';
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
            .put(verifyToken, this.userController.updateInfoUser);
        this.router.route('/users')
            .get(verifyToken, this.userController.getInfoUser);
        this.router.route('/users/forgot-password')
            .put(verifyToken, this.userController.forgotPassword);
        this.router.route('/users/auto-suggest')
            .get(verifyToken, this.userController.autoSuggest);
        this.router.route('/users/follow')
            .post(verifyToken, this.userController.createFollow);


    }
}

export default new UserRoutes().router;