import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { Secret, verify, JwtPayload } from "jsonwebtoken";

type AuthPayload = JwtPayload & { id: number; session?: number };

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.header("Authorization");
  let accessToken = token.split(" ")[1];
  if (accessToken) {
    try {
      const decodeUser = verify(accessToken, "sdgjhsdflgjslfgjksfkwpeijwe23" as Secret) as AuthPayload;
      const userModel = new UserModel();
      const user = await userModel.findUserById(decodeUser.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  }
  return res.status(401).json({
    success: false,
    message: "Access token not found",
  });
}
