import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';


export function verifyId(req: Request, res: Response, next: NextFunction) {
    let idUser = req.header('id')
    if (!idUser) {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
    const userModel = new UserModel();
    userModel.findUserById(idUser)
        .then((respond) => {
            if (respond) {
                req['id'] = idUser;
                next();
            } else {
                res.status(401).json({ status: 401, message: 'Unauthorized' });
            }
        })

}