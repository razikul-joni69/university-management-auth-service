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
        year: z.string({
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

const updateAcademicSemisterZodSchema = z
    .object({
        body: z.object({
            title: z
                .enum([...academicSemisterTitles] as [string, ...string[]], {
                    required_error: 'Title is required!',
                })
                .optional(),
            year: z
                .string({
                    required_error: 'Year is required!',
                })
                .optional(),
            code: z
                .enum([...academicSemisterCodes] as [string, ...string[]], {
                    required_error: 'Code is required',
                })
                .optional(),
            startMonth: z
                .enum([...academicSemisterMonths] as [string, ...string[]], {
                    required_error: 'Start Month is required',
                })
                .optional(),
            endMonth: z
                .enum([...academicSemisterMonths] as [string, ...string[]], {
                    required_error: 'End Month is required',
                })
                .optional(),
        }),
    })
    .refine(
        data =>
            (data.body.title && data.body.code) ||
            (!data.body.title && !data.body.code),
        {
            message:
                '⚠️ Either both title and code must be provided or neither!',
        }
    );

export const AcademicSemisterValidation = {
    createAcademicSemisterZodSchema,
    updateAcademicSemisterZodSchema,
};
