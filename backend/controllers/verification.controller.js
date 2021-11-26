import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, BadRequestError } from '../errors/custom-api-error.js';
import { generateOTPEmail } from '../utils/generate-otp-email.js';
import User from '../models/user.model.js';
import Verification from '../models/verification.model.js';

export const verifyEmail = async (req, res) => {
    const { name, email } = req.body;

    if (!name) {
        throw new BadRequestError('Hãy nhập tên của bạn');
    }

    if (name.length < 5) {
        throw new BadRequestError('Tên không thể có ít hơn 5 ký tự');
    }

    if (name.length > 40) {
        throw new BadRequestError('Tên không thể có nhiều hơn 40 ký tự');
    }

    if (!email) {
        throw new BadRequestError('Hãy nhập email của bạn');
    }

    if (
        !RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(email)
    ) {
        throw new BadRequestError('Email không hợp lệ');
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new BadRequestError('Email này đã được đăng ký');
    }
    const verificationInfo = await Verification.findOne({ email });
    if (verificationInfo) {
        res.status(StatusCodes.OK).json({
            message: `Mã xác nhận OTP đã được gửi tới địa chỉ email ${email}. Bạn vui lòng kiểm tra email hoặc thử lại sau ít phút nữa`,
            status: 'EMAIL_ALREADY_SENT',
        });
    } else {
        const { otp } = await generateOTPEmail(name, email);
        await Verification.create({ email, otp });
        res.status(StatusCodes.OK).json({
            message: `Hệ thống đã gửi mã xác nhận OTP tới địa chỉ email ${email}`,
            status: 'EMAIL_SENT',
        });
    }
};

export const confirmEmail = async (req, res) => {
    const { email, otp } = req.body;
    if (!email) {
        throw new BadRequestError('Email không được để trống');
    }
    if (!otp) {
        throw new BadRequestError('Mã OTP không được để trống');
    }
    const isOTPExist = await Verification.findOne({ email });
    if (!isOTPExist) {
        throw new BadRequestError('Mã OTP đã hết hạn');
    }
    const verificationInfo = await Verification.findOne({ email, otp });
    if (!verificationInfo) {
        throw new AuthenticationError('Mã OTP không đúng');
    }
    await Verification.findOneAndDelete({ _id: verificationInfo.id });
    res.status(StatusCodes.OK).json({ message: `Email ${email} đã xác thực thành công` });
};
