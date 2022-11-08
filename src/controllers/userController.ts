import { Request, Response, NextFunction } from 'express';

export default class UserController {
    async getHome(req: Request, res: any, next: NextFunction) {
        res.send('welcome to Hieu dep trai.')
    }
}