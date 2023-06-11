import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Success',
        data: 'Auth Server Is Running',
    });
});

export default app;
