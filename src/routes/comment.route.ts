import { Router } from 'express';
import CommentController from '../controllers/commentController';
import { verifyToken } from '../middlewares/auth';

class CommentRoutes {
    router = Router();
    commentController = new CommentController()
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/comments')
            .post(verifyToken, this.commentController.createComment);
    }
}

export default new CommentRoutes().router;