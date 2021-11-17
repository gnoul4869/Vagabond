import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import { hideEmail } from '../utils/hide-details.js';
import moment from 'moment';

export const getUserDetails = async (req, res) => {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
        throw new NotFoundError('Tài khoản không tồn tại');
    }
    const hiddenEmail = hideEmail(user.email);
    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
        },
    });
};

export const updateUserDetails = async (req, res) => {
    const { name, address, phoneNumber, gender, birthDate } = req.body;

    if (!name) {
        throw new BadRequestError('Hãy nhập tên của bạn');
    }

    if (!address) {
        throw new BadRequestError('Hãy nhập địa chỉ của bạn');
    }

    if (!phoneNumber) {
        throw new BadRequestError('Hãy nhập số điện thoại của bạn');
    }

    if (!gender) {
        throw new BadRequestError('Hãy chọn giới tính của bạn');
    }

    if (!birthDate) {
        throw new BadRequestError('Hãy chọn ngày sinh của bạn');
    }

    var age = moment().diff(birthDate, 'years');
    if (age < 12) {
        throw new BadRequestError('Số tuổi của bạn phải lớn hơn 12');
    }
    if (age > 125) {
        throw new BadRequestError('Số tuổi không hợp lệ');
    }

    const user = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { name, address, phoneNumber, gender, birthDate },
        { new: true, runValidators: true }
    );
    if (!user) {
        throw new NotFoundError('Tài khoản không tồn tại');
    }
    const hiddenEmail = hideEmail(user.email);
    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
        },
    });
};
