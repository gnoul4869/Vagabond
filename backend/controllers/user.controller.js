import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { hideEmail, hidePhoneNumber } from '../utils/hide-details.js';

export const getUserDetails = async (req, res) => {
    const user = await User.findById({ _id: req.user.id });
    const hiddenEmail = hideEmail(user.email);
    const hiddenPhoneNumber = hidePhoneNumber(user.phoneNumber);
    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            address: user.address,
            phoneNumber: hiddenPhoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
        },
    });
};
