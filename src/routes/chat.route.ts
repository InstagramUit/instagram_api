import { Router } from "express";
import ChatController from "../controllers/ChatController";
import { verifyToken } from "../middlewares/auth";

class ChatRoutes {
  router = Router();
  chatController = new ChatController();
  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route("/chat").get(verifyToken, this.chatController.getListChat);
    this.router.route("/chat").post(verifyToken, this.chatController.createChat);
  }
}

export default new ChatRoutes().router;
