import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import FollowModel from "../models/follow.model";
import PostModel from "../models/post.model";
import argon2 from "argon2";
import { Secret, sign, verify } from "jsonwebtoken";
import { addItem } from "../services/cloudinary.service";
const userModel = new UserModel();
const followModel = new FollowModel();
const postModel = new PostModel();

const createToken = (user: any, type: "accessToken" | "refreshToken" = "accessToken") => {
  const tokenSecret = "sdgjhsdflgjslfgjksfkwpeijwe23";
  const expiresIn = "1d";

  const payload = {
    id: user.id,
  };
  return sign(payload, tokenSecret as Secret, { expiresIn });
};

export default class UserController {
  async getHome(req: Request, res: any, next: NextFunction) {
    res.send("welcome to Hieu dep trai.");
  }
  async login(req: Request, res: any, next: NextFunction) {
    const { email, password } = req.body;
    console.log({ email, password });

    if (!email || !password) {
      return res.status(401).json({ mess: "incorrect data" });
    }
    let infoUser = await userModel.findUser(email);
    if (!infoUser) {
      return res.status(404).json({ mess: "notFound data" });
    }
    const isPasswordMatch = await argon2.verify(`${infoUser.password}`, password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({ mess: "password wrong." });
    }
    const accessToken = createToken(infoUser);
    return res.status(200).json({
      user: {
        accessToken,
        ...infoUser,
      },
    });
  }
  async signUp(req: Request, res: any, next: NextFunction) {
    try {
      const { display_name, password, email } = req.body;
      if (!display_name || !password || !email) {
        return res.status(404).json({ mess: "Chưa đầy đủ thông tin tối thiểu" });
      }
      const infoUser = await userModel.checkExistUser(email);
      if (infoUser) {
        return res.status(400).json({ mess: "email đã tồn tại." });
      }
      const passwordHash = await argon2.hash(password);
      let user = {
        password: passwordHash,
        display_name,
        email,
      };
      let id_user = await userModel.createNewUser(user);
      const accessToken = createToken(user);
      return res.status(200).json({
        user: {
          accessToken,
          ...user,
          id: id_user,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "dang ki that bai" });
    }
  }
  async updateInfoUser(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const { display_name, avatar } = req.body;
      const linkURLAvatar = await addItem(avatar, `user/${user.id}`, "image");

      userModel
        .updateInfoUser(user.id, { display_name, avatar: linkURLAvatar })
        .then((res) => {
          return res.status(200).json({ mess: "success" });
        })
        .catch((err) => {
          return res.status(400).json({ err });
        });
    } catch (error) {}
  }
  async getInfoCurrentUser(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const infoUser = await userModel.findUserById(user.id);
      const followers = await followModel.findFollower(user.id);
      console.log(followers);
      const followings = await followModel.findFollowing(user.id);
      const posts = await postModel.getPost(user.id);

      return res.json({
        data: {
          ...infoUser,
          followers,
          followings,
          posts: posts.map((post) => ({ ...post, items: JSON.parse(post.items) })),
        },
      });
    } catch (error) {
      res.status(400).json({ message: "lay thong tin that bai." });
    }
  }
  async getInfoAnotherUser(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const user_id = Number(req.params.user_id);
      console.log(user_id);

      const infoUser = await userModel.findUserById(user_id);
      const followers = await followModel.findFollower(user_id);
      const followings = await followModel.findFollowing(user_id);
      const posts = await postModel.getPost(user_id);

      return res.json({
        data: {
          ...infoUser,
          followers,
          followings,
          isFollow: followers.some((follower) => follower.user_id == user.id),
          posts: posts.map((post) => ({ ...post, items: JSON.parse(post.items) })),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "lay thong tin that bai." });
    }
  }
  async forgotPassword(req: Request, res: any, next: NextFunction) {}
  async autoSuggest(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const suggestUsers = await userModel.getSuggestUser(user.id);
      res.json({ data: suggestUsers });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "co loi xay ra" });
    }
  }
  async createFollow(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const { followUsers } = req.body;
      // const  followUsers  = [
      //     {
      //         follow:true,
      //         id:3,
      //     }
      // ]
      if (!Array.isArray(followUsers)) {
        res.status(400).json({ message: "sai dinh dang." });
      }
      for (let followUser of followUsers) {
        if (followUser.follow) {
          await followModel.createFollow(user.id, followUser.id);
        } else {
          await followModel.deleteFollow(user.id, followUser.id);
        }
      }
      return res.json({ message: "follow thanh cong." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "follow khong thanh cong." });
    }
  }
  async searchUser(req: Request, res: any, next: NextFunction) {
    try {
      const { user } = req;
      const { name } = req.body;
      let result = await userModel.findSimilarUser(name, user.id);
      res.json({ data: result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "search khong thanh cong." });
    }
  }
}
