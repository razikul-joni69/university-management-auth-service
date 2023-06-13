import { User } from './users.model';

// Get the last created user id
export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

    return lastUser?.id;
};

// If any user is available return the last user id or create a new user id
export const generateUserId = async () => {
    const currentId =
        (await findLastUserId()) || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

    return incrementedId;
};
