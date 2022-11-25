import { Request, Response, NextFunction } from 'express';
import { addItem } from '../services/cloudinary.service';
import PostModel from '../models/post.model';

const postModel = new PostModel()
export default class PostController {
    async createPost(req: Request, res: any, next: NextFunction) {
        try {
            const { id } = req['id']
            const { items, title, description } = req.body
            console.log(req.body);
            if (Array.isArray(items) || title == '' || description == '') {
                res.status(400).json({ message: 'thiếu thông tin.' })
            }
            let formatItems = []
            for (let item of items) {
                formatItems.push(addItem(item.src, `/posts/${1}`, item.type))
            }
            let result = await Promise.all(formatItems)
            console.log(result);
            let data = {
                user_id: Number(id),
                items: JSON.stringify(result),
                title,
                description,
            }
            await postModel.createNewPost(data)
            res.json({ data: result })
        } catch (error) {
            console.log(error);
            next()
        }
    }

}