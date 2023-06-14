import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemisterValidation } from './academicSemister.validation';

const router = express.Router();

router.post(
    '/create-semister',
    validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
    AcademicSemisterController.createSemister
);

export const AcademicSemisterRoutes = router;
