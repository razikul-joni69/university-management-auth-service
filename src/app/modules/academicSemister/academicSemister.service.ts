import status from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemisterTitlesCodesMaper } from './academicSemister.constant';
import { IAcademidSemister } from './academicSemister.interface';
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

export const AcademicSemisterService = {
    createSemister,
};
