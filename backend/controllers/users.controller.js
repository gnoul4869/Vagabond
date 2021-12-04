import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import User from '../models/user.model.js';
import Address from '../models/address.model.js';
import { hideEmail } from '../utils/hide-details.js';
import { uploadImageToStorage } from '../firebase/firebase.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';

export const getUserDetails = async (req, res) => {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
        throw new NotFoundError('Tài khoản không tồn tại');
    }

    const hiddenEmail = hideEmail(user.email);
    const address = await Address.findOne({ createdBy: req.user.id });
    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            address: {
                provinceID: address.provinceID,
                provinceName: address.provinceName,
                districtID: address.districtID,
                districtName: address.districtName,
                wardID: address.wardID,
                wardName: address.wardName,
                addressDetails: address.addressDetails,
            },
        },
    });
};

export const updateUserDetails = async (req, res) => {
    const {
        name,
        phoneNumber,
        gender,
        birthDate,
        provinceID,
        provinceName,
        districtID,
        districtName,
        wardID,
        wardName,
        addressDetails,
    } = req.body;

    if (!name) {
        throw new BadRequestError('Hãy nhập tên của bạn');
    }

    if (name.length < 5) {
        throw new BadRequestError('Tên không thể có ít hơn 5 ký tự');
    }

    if (name.length > 40) {
        throw new BadRequestError('Tên không thể có nhiều hơn 40 ký tự');
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

    if (!provinceID) {
        throw new BadRequestError('Hãy cung cấp mã tỉnh/thành phố');
    }

    if (!provinceName) {
        throw new BadRequestError('Hãy cung cấp tên tỉnh/thành phố');
    }

    if (!districtID) {
        throw new BadRequestError('Hãy cung cấp mã quận/huyện');
    }

    if (!districtName) {
        throw new BadRequestError('Hãy cung cấp tên quận/huyện');
    }

    if (!wardID) {
        throw new BadRequestError('Hãy cung cấp mã phường/xã');
    }

    if (!wardName) {
        throw new BadRequestError('Hãy cung cấp tên phường/xã');
    }

    if (!addressDetails) {
        throw new BadRequestError('Hãy cung cấp địa chỉ cụ thể');
    }

    let newUserData = {
        name,
        phoneNumber,
        gender,
        birthDate,
    };

    if (req.file) {
        if (req.file.size > 1 * 1024 * 1024) {
            throw new BadRequestError('Chỉ cho phép hình ảnh có kích thước tối đa 1 MB');
        }
        const image = await uploadImageToStorage(req.file, req.user.id);
        newUserData = { ...newUserData, image };
    }

    const user = await User.findByIdAndUpdate({ _id: req.user.id }, newUserData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new NotFoundError('Tài khoản không tồn tại');
    }

    const hiddenEmail = hideEmail(user.email);

    const address = await Address.findOneAndUpdate(
        { createdBy: req.user.id },
        { provinceID, provinceName, districtID, districtName, wardID, wardName, addressDetails },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            address: {
                provinceID: address.provinceID,
                provinceName: address.provinceName,
                districtID: address.districtID,
                districtName: address.districtName,
                wardID: address.wardID,
                wardName: address.wardName,
                addressDetails: address.addressDetails,
            },
        },
    });
};
