import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademidSemister } from './academicSemister.interface';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...academicSemisterData } = req.body;
        const result = await AcademicSemisterService.createSemister(
            academicSemisterData
        );

        sendResponse<IAcademidSemister>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semister is created successfully',
            data: result,
        });

        next();
    }
);

export const AcademicSemisterController = {
    createSemister,
};
