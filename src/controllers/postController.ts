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
            if (Array.isArray(items) || description.length == 0) {
                return res.status(400).json({ message: 'thiếu thông tin.' })
            }
            let formatItems = []
            for (let item of items) {
                formatItems.push(addItem(item.src, `/posts/${1}`, item.type))
            }
            let result = await Promise.all(formatItems)
            let data = {
                id_user: user.id,
                items: JSON.stringify(result),
                description: 'Niềm mơ ước của bao người ',
            }
            await postModel.createNewPost(data)
            return res.json({ message: 'success' })
        } catch (error) {
            console.log(error);
            next()
        }
    }
    async showPost(req: Request, res: any, next: NextFunction) {
        try {
            const { user } = req;
            let { oldPosts = [] } = req.body;
            let postsFollowing = await followModel.findPostsFollowing(user.id)
            let formatPosts = []
            for (let post of postsFollowing) {
                if (oldPosts.every(oldPost => oldPost.id !== post.id)) {
                    let comments = await postModel.findComments(post.id)
                    let likes = await postModel.findLikes(post.id)
                    formatPosts.push({
                        ...post,
                        comments,
                        likes,
                        follow: true,
                        items: JSON.parse(post.items),
                        totalComments: comments.length,
                        totalLikes: likes.length,
                    })
                }
            }
            let result = await Promise.all(formatPosts)
            return res.json({
                data: {
                    posts: result
                }
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'khong lay duoc post .' })
        }
    }
    async setLikePost(req: Request, res: any, next: NextFunction) {
        try {
            const { user } = req
            const { id_post } = req.params
            const { isLike } = req.body

            let result = await postModel.setLikePost(user.id, Number(id_post), isLike)
            console.log(result);
            res.json({ message: 'thay doi like thanh cong.' })
        } catch (error) {
            console.log(error);
            next()
        }
    }

}