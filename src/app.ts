import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHander from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// INFO: Application routes
app.use('/api/v1/users', UserRoutes);

// Testing routes
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     next(Promise.reject(new Error('Testing error logger')));
//     // next('Api Error');
//     // throw new ApiError(400, 'Api Error');
//     // console.log(x)
// });

// INFO: Global error handler
app.use(globalErrorHander);

export default app;
