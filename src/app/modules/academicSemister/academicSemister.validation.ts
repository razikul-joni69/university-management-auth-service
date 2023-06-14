import { z } from 'zod';
import {
    academicSemisterCodes,
    academicSemisterMonths,
    academicSemisterTitles,
} from './academicSemister.constant';

// Request validation
const createAcademicSemisterZodSchema = z.object({
    body: z.object({
        title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
            required_error: 'Title is required!',
        }),
        year: z.number({
            required_error: 'Year is required!',
        }),
        code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
            required_error: 'Code is required',
        }),
        startMonth: z.enum(
            [...academicSemisterMonths] as [string, ...string[]],
            {
                required_error: 'Start Month is required',
            }
        ),
        endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
            required_error: 'End Month is required',
        }),
    }),
});

export const AcademicSemisterValidation = { createAcademicSemisterZodSchema };
