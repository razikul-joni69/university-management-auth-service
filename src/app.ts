import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';
import globalErrorHander from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// INFO: Application routes
app.use('/api/v1/', routes);

// Testing routes
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     // next(Promise.reject(new Error('Testing error logger')));
//     // next('Api Error');
//     // throw new ApiError(400, 'Api Error');
//     // console.log(x)
// });

// INFO: Global error handler
app.use(globalErrorHander);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });

    next();
});

export default app;
