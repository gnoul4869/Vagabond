import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, AuthenticationError } from '../errors/custom-api-error.js';
import moment from 'moment';

const register = async (req, res) => {
    const { email, password, name, address, phoneNumber, gender, birthDate } = req.body;

    if (!email) {
        throw new BadRequestError('Hãy nhập email của bạn');
    }

    if (!password) {
        throw new BadRequestError('Hãy nhập mật khẩu của bạn');
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
        throw new BadRequestError('Bạn phải lớn hơn 12 tuổi để đăng ký tài khoản');
    }
    if (age > 125) {
        throw new BadRequestError('Số tuổi không hợp lệ');
    }

    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({
        userInfo: {
            email: user.email,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            token: token,
        },
    });
};

const login = async (req, res) => {
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

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        userInfo: {
            email: user.email,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
            token: token,
        },
    });
};

export { register, login };
