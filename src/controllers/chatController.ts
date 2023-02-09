import { Request, Response, NextFunction } from "express";
import { addItem } from "../services/cloudinary.service";
import PostModel from "../models/post.model";
import FollowModel from "../models/follow.model";
import CommentModel from "../models/comment.model";
import { createMessage, getMessages, getReceiverUsers, getSenderUsers } from "../models/chat.model";
import UserModel from "../models/user.model";


const userModel = new UserModel()
export default class ChatController {
  async getListChat(req: Request, res: any, next: NextFunction) {
    const { user } = req;
    try {
      let senderUser: any = await getSenderUsers(user.id);
      senderUser =
        Array.isArray(senderUser) && senderUser.length > 0
          ? senderUser.map((element) => element.id)
          : [];

      let receiverUsers: any = await getReceiverUsers(user.id);
      receiverUsers =
        Array.isArray(receiverUsers) && receiverUsers.length > 0
          ? receiverUsers.map((element) => element.id)
          : [];
      console.log({id:user.id,senderUser,receiverUsers})

      const chatUsers = Object.assign(senderUser,receiverUsers)

      let infoChatUsers = []
      await Promise.all(
        chatUsers.map(async(user_id:any)=>{
          const infoUser = await userModel.findUserById(user_id)
          const infoChat = await getMessages(user_id,user.id)
          infoChatUsers.push({
            user:{
              ...infoUser
            },
            message:infoChat
          })
        })
      );
      console.log(infoChatUsers)
      return res.json({data:infoChatUsers})
    } catch (error) {
      next(error)
    }
  }
  async createChat(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const { id_user, content } = req.body;
      const data = {
        to_id: user.id,
        from_id: id_user,
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
