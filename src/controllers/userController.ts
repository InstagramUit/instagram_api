import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
const userModel = new UserModel()
export default class UserController {
    async getHome(req: Request, res: any, next: NextFunction) {
        res.send('welcome to Hieu dep trai.')
    }
    async login(req: Request, res: any, next: NextFunction) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ mess: 'incorrect data' })
        }
        let infoUser = await userModel.findUser({ email, password })
        if (!infoUser) {
            return res.status(404).json({ mess: 'notFound data' })
        }
        return res.status(200).json({ id: infoUser.id })
    }
    async signUp(req: Request, res: any, next: NextFunction) {
        const { display_name, password, email } = req.body;
        if (!display_name || !password || !email) {
            return res.status(404).json({ mess: 'Chưa đầy đủ thông tin tối thiểu' })
        }
        const infoUser = await userModel.checkExistUser(email)
        if (infoUser) {
            return res.status(400).json({ mess: 'email đã tồn tại.' })
        }
        let idUser = await userModel.createNewUser({ display_name, password, email })
        return res.status(200).json({ id: idUser })
    }
    async updateInfoUser(req: Request, res: any, next: NextFunction) {
        const { display_name, avatar, user_name } = req.body
        if (!user_name) {
            return res.status(400).json({ mess: 'incorrect data' })
        }
        // import base 64 to cloudinary
        //,,,,,
        const linkURLAvatar = null
        userModel.updateInfoUser(user_name, { display_name, avatar: linkURLAvatar })
            .then((res) => {
                return res.status(200).json({ mess: 'success' })
            })
            .catch((err) => {
                return res.status(400).json({ err })
            })

    }
    async forgotPassword(req: Request, res: any, next: NextFunction) {

    }
}