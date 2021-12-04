import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import Address from '../models/address.model.js';
import Verification from '../models/verification.model.js';
import { BadRequestError, AuthenticationError } from '../errors/custom-api-error.js';

export const register = async (req, res) => {
    const {
        email,
        password,
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

    if (!email) {
        throw new BadRequestError('Hãy nhập email của bạn');
    }

    const isEmailVerified = await Verification.findOne({ email });

    if (!isEmailVerified) {
        throw new BadRequestError('Email này chưa được xác nhận hoặc đã quá thời hạn xác nhận');
    }

    if (
        !RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(email)
    ) {
        throw new BadRequestError('Email không hợp lệ');
    }

    if (!password) {
        throw new BadRequestError('Hãy nhập mật khẩu của bạn');
    }

    if (password.length < 6) {
        throw new BadRequestError('Mật khẩu không hợp lệ');
    }

    if (!RegExp('(?=.*[a-z])|(?=.*[A-Z])').test(password)) {
        throw new BadRequestError('Mật khẩu phải có ít nhất 1 chữ cái');
    }

    if (!RegExp('(?=.*[0-9])').test(password)) {
        throw new BadRequestError('Mật khẩu phải có ít nhất 1 chữ số');
    }

    if (!RegExp('(?=.{6,})').test(password)) {
        throw new BadRequestError('Mật khẩu phải có ít nhất 6 ký tự');
    }

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

    const address = await Address.create({
        provinceID,
        provinceName,
        districtID,
        districtName,
        wardID,
        wardName,
        addressDetails,
    });

    const user = await User.create({
        email,
        password,
        name,
        phoneNumber,
        gender,
        birthDate,
        address: address._id,
    });

    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({
        userInfo: {
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            token: token,
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

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Hãy nhập email và password');
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        throw new AuthenticationError('Email hoặc mật khẩu của bạn không đúng');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Email hoặc mật khẩu của bạn không đúng');
    }

    const address = await Address.findOne({ createdBy: user.id });

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        userInfo: {
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            token: token,
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
