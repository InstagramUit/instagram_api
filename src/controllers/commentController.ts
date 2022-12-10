import { Request, Response, NextFunction } from 'express';
import { addItem } from '../services/cloudinary.service';
import PostModel from '../models/post.model';
import FollowModel from '../models/follow.model';
import CommentModel from '../models/comment.model';
const postModel = new PostModel()
const followModel = new FollowModel()
const commentModel = new CommentModel()

export default class CommentController {
    async createComment(req: Request, res: any, next: NextFunction) {
        try {
            const { user } = req
            const {id_post, content} = req.body
            const data = {
                id_user:user.id,
                id_post,
                content,
            }
            console.log(req.body);
            await commentModel.createComment(data)
            
            res.json({ message: 'success' })
        } catch (error) {
            console.log(error);
            next()
        }
    }
}