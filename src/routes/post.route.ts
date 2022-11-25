import { Router } from 'express';
import PostController from '../controllers/postController';
import { verifyId } from '../middlewares/auth';

class PostRoutes {
    router = Router();
    postController = new PostController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/posts')
            .post(this.postController.createPost);

    }
}

export default new PostRoutes().router;