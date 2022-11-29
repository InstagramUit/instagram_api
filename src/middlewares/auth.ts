import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import { Secret, verify } from 'jsonwebtoken'

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.header('Authorization')
    let accessToken = token.split(' ')[1]
    const decodeUser = verify(accessToken, 'sdgjhsdflgjslfgjksfkwpeijwe23')
    const userModel = new UserModel();
    const user = await userModel.findUserById(decodeUser.id)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found',
        })
    }
    req.user = user
    return next()
}