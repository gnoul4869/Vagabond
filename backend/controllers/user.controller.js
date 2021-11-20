import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import { hideEmail } from '../utils/hide-details.js';
import moment from 'moment';
import { uploadImageToStorage } from '../firebase/firebase.js';

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

    if (name.length < 5) {
        throw new BadRequestError('Tên không thể có ít hơn 5 ký tự');
    }

    if (name.length > 40) {
        throw new BadRequestError('Tên không thể có nhiều hơn 40 ký tự');
    }

    if (!address) {
        throw new BadRequestError('Hãy nhập địa chỉ của bạn');
    }

    if (!phoneNumber) {
        throw new BadRequestError('Hãy nhập số điện thoại của bạn');
    }

    if (phoneNumber.length !== 10) {
        throw new BadRequestError('Số điện thoại của bạn không hợp lệ');
    }

    if (!gender) {
        throw new BadRequestError('Hãy chọn giới tính của bạn');
    }

    if (!birthDate) {
        throw new BadRequestError('Hãy chọn ngày sinh của bạn');
    }

    const convertedDate = moment(new Date(birthDate), moment.ISO_8601);

    if (!convertedDate.isValid()) {
        throw new BadRequestError('Ngày sinh không hợp lệ');
    }

    const age = moment().diff(convertedDate, 'years');

    if (age < 12) {
        throw new BadRequestError('Số tuổi của bạn phải lớn hơn 12');
    }

    if (age > 125) {
        throw new BadRequestError('Số tuổi không hợp lệ');
    }

    let newData = {
        name,
        address,
        phoneNumber,
        gender,
        birthDate,
    };

    if (req.file) {
        if (req.file.size > 1 * 1024 * 1024) {
            throw new BadRequestError('Chỉ cho phép hình ảnh có kích thước tối đa 1 MB');
        }
        const image = await uploadImageToStorage(req.file, req.user.id);
        newData = { ...newData, image };
    }

    const user = await User.findByIdAndUpdate({ _id: req.user.id }, newData, {
        new: true,
        runValidators: true,
    });
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
