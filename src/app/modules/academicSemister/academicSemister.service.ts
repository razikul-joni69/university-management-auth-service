import status from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
    academicSemesterSearchableFields,
    academicSemisterTitlesCodesMaper,
} from './academicSemister.constant';
import {
    IAcademicSemisterFilters,
    IAcademidSemister,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createSemister = async (
    payload: IAcademidSemister
): Promise<IAcademidSemister> => {
    if (academicSemisterTitlesCodesMaper[payload.title] !== payload.code) {
        throw new ApiError(status.BAD_REQUEST, 'Invalid Semister Code');
    }
    const result = await AcademicSemister.create(payload);
    return result;
};

const getAllSemisters = async (
    filters: IAcademicSemisterFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademidSemister[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicSemesterSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    // const andConditions = [
    //     {
    //         $or: [
    //             {
    //                 title: {
    //                     $regex: searchTerm,
    //                     $options: 'i',
    //                 },
    //             },
    //             {
    //                 code: {
    //                     $regex: searchTerm,
    //                     $options: 'i',
    //                 },
    //             },
    //             {
    //                 year: {
    //                     $regex: searchTerm,
    //                     $options: 'i',
    //                 },
    //             },
    //         ],
    //     },
    // ];

    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await AcademicSemister.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await AcademicSemister.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleSemister = async (
    id: string
): Promise<IAcademidSemister | null> => {
    const result = await AcademicSemister.findById(id);
    return result;
};

const updateSemister = async (
    id: string,
    payload: Partial<IAcademidSemister>
): Promise<IAcademidSemister | null> => {
    if (
        payload.title &&
        payload.code &&
        academicSemisterTitlesCodesMaper[payload.title] !== payload.code
    ) {
        throw new ApiError(status.BAD_REQUEST, 'Invalid Semister Code');
    }

    const result = await AcademicSemister.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};

const deleteSemister = async (
    id: string
): Promise<IAcademidSemister | null> => {
    const result = await AcademicSemister.findByIdAndDelete(id);
    return result;
};

export const AcademicSemisterService = {
    createSemister,
    getAllSemisters,
    getSingleSemister,
    updateSemister,
    deleteSemister,
};
