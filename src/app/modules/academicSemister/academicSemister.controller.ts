import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemister.constant';
import { IAcademidSemister } from './academicSemister.interface';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister = catchAsync(async (req: Request, res: Response) => {
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
});

const getAllSemisters = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemisterService.getAllSemisters(
        filters,
        paginationOptions
    );

    sendResponse<IAcademidSemister[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semisters Data Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemisterService.getSingleSemister(id);
    sendResponse<IAcademidSemister>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semister Data Retrieved successfully!',
        data: result,
    });
});

const updateSemister = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicSemisterService.updateSemister(
        id,
        updatedData
    );
    sendResponse<IAcademidSemister>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semister updated successfully!',
        data: result,
    });
});

const deleteSemister = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemisterService.deleteSemister(id);
    sendResponse<IAcademidSemister>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semister deleted successfully!',
        data: result,
    });
});

export const AcademicSemisterController = {
    createSemister,
    getAllSemisters,
    getSingleSemister,
    updateSemister,
    deleteSemister,
};
