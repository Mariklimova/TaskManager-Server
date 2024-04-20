import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import routeUser from './controller/user.controller';
import routeTask from './controller/task.controller';
import routeApi from './controller/api.controller';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true
    }),
);

app.use(bodyParser.json());
app.use('/user', routeUser);
app.use('/task', routeTask);
app.use('/api', routeApi);

app.use((er: any, _req: Request, res: Response, _next: NextFunction): void => res.send(er.message));

export { app };
