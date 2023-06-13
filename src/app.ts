import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './modules/users/users.route';
const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// INFO: Application routes
app.use('/api/v1/users', router);

app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: 'Success',
        data: 'Auth Server Is Running',
    });
});

export default app;
