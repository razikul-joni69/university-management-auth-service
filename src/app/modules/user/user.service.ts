// INFO: we will write here business  logics (database logics) | no request-response will be here

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
    // Auto genereted user id
    const id = await generateUserId();
    user.id = id;
    // Default password
    if (!user.password) {
        user.password = config.default_user_password as string;
    }
    const createdUser = await User.create(user);

    if (!createUser) {
        throw new ApiError(400, 'Failed to create user!');
    }

    return createdUser;
};

export const UserService = {
    createUser,
};
