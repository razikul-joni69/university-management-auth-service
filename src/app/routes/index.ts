import express from 'express';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academic-semisters',
        route: AcademicSemisterRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
