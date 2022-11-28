import { Request, Response, NextFunction } from 'express';
import { addItem } from '../services/cloudinary.service';
import PostModel from '../models/post.model';
import FollowModel from '../models/follow.model';
const postModel = new PostModel()
const followModel = new FollowModel()
export default class PostController {
    async createPost(req: Request, res: any, next: NextFunction) {
        try {
            const { user } = req
            const { items, description } = req.body
            console.log(req.body);
            if (Array.isArray(items) || description == '') {
                res.status(400).json({ message: 'thiếu thông tin.' })
            }
            let formatItems = []
            for (let item of items) {
                formatItems.push(addItem(item.src, `/posts/${1}`, item.type))
            }
            let result = await Promise.all(formatItems)
            console.log(result);
            let data = {
                user_id: Number(user.id),
                items: JSON.stringify(result),
                description,
            }
            await postModel.createNewPost(data)
            res.json({ message: 'success' })
        } catch (error) {
            console.log(error);
            next()
        }
    }
    async showPost(req: Request, res: any, next: NextFunction) {
        const { user } = req;
        const { oldPosts } = req.body;
        const postsFollowing = await followModel.findPostsFollowing(user.id)
        postsFollowing.filter(post => {
            return oldPosts.every(oldPost => oldPost.id !== post.id)
        })
        return res.json({
            data: {
                posts: postsFollowing
            }
        })
    }

}