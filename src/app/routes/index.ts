import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
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
    {
        path: '/academic-facultys',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
