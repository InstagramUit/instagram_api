import { Router } from 'express';
import PostController from '../controllers/postController';
import { verifyToken } from '../middlewares/auth';

class PostRoutes {
    router = Router();
    postController = new PostController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/posts')
            .post(verifyToken, this.postController.createPost);
        this.router.route('/posts')
            .get(verifyToken, this.postController.showPost);

    }
}

export default new PostRoutes().router;