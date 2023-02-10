import { Request, Response, NextFunction } from "express";
import { addItem } from "../services/cloudinary.service";
import PostModel from "../models/post.model";
import FollowModel from "../models/follow.model";
import CommentModel from "../models/comment.model";
import { createMessage, getMessages, getReceiverUsers, getSenderUsers } from "../models/chat.model";
import UserModel from "../models/user.model";
import { getInfoMessages } from "../services/chat.service";


const userModel = new UserModel()
export default class ChatController {
  async getListChat(req: Request, res: any, next: NextFunction) {
    const { user } = req;
    try {
      let messages = await getInfoMessages(user.id)
      return res.json({data:messages})
    } catch (error) {
      next(error)
    }
  }
  async createChat(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const { id_user, content } = req.body;
      const data = {
        from_id: user.id,
        to_id: id_user,
        content,
      };
      const result = await createMessage(data);

      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
