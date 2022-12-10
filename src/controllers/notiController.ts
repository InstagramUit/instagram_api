import { Request, Response, NextFunction } from "express";
import NotiModel from "../models/noti.model";
import PostModel from "../models/post.model";
import moment from "moment";

const notiModel = new NotiModel();
const postModel = new PostModel();

export default class NotiController {
  async getNotification(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const posts = await postModel.getPost(user.id);
      let arrNotiComment = [];
      let arrNotiLike = [];
      for (let post of posts) {
        let notiComments = await notiModel.getNotificationPost(post.id, "comment");
        let notiLikes = await notiModel.getNotificationPost(post.id, "like");
        arrNotiComment.push(
          ...notiComments.map((comment) => ({
            ...comment,
            type: "comment",
            items: findFirstImageInItems(JSON.parse(comment.items)),
          }))
        );
        arrNotiLike.push(
          ...notiLikes.map((like) => ({
            ...like,
            type: "like",
            items: findFirstImageInItems(JSON.parse(like.items)),
          }))
        );
      }
      let result = await Promise.all([...arrNotiComment, ...arrNotiLike]);
      // sort created_at
      result = result.sort((a, b) => {
        return moment(a.created_at) > moment(b.created_at) ? 1 : 0;
      });
      return res.json({ data: result });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
function findFirstImageInItems(items){
  return items.find(item=> item.type=='image').src
}