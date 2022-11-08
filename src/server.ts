import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import Routes from './routes';
import rateLimit from 'express-rate-limit';
import session from 'express-session';

let DOMAINS = [];
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 300 // limit each IP to 30 requests per windows
});
interface user {
    id: number,
    email: string
}
declare global {
    namespace Express {
        interface Request {
            user: user
        }
    }
}


// Server Class
class Server {
    public app: Application;
    public io;
    constructor() {
        this.app = express();
        this.app.use(express.static(__dirname + '/assets'));
        this.config();
        new Routes(this.app);

        this.handleError();

    }
    public config(): void {
        this.app.set('port', process.env.PORT || 4000);
        // middlewares
        this.app.use(morgan('dev'))

            .use(helmet())
            .use(compression())
            .use(cors())
            .use(limiter)
            .use(session({
                resave: true,
                saveUninitialized: true,
                secret: '123456789',
                cookie: { maxAge: 120000 }
            }))
            .use(express.json({ limit: '100mb' }))
            .use(express.urlencoded({ limit: '100mb', extended: false }));
    }
    public handleError(): void {
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            res.status(404).json({
                message: 'Endpoint not found.'
            });
        });
        this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
            console.log(err + '');

            res.status(500).send({
                status: 500,
                error: 'Something went wrong, please try again!'
            });
        });
    }
    public start(): void {
        this.app.listen(this.app.get('port'), async () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}

export { Server };