import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (
    error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
        (elm: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: elm?.path,
                message: elm.message,
            };
        }
    );

    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error!🚫',
        errorMessages: errors,
    };
};

export default handleValidationError;
