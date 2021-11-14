import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, BadRequestError } from '../errors/custom-api-error.js';
import User from '../models/user.model.js';
import Verification from '../models/verification.model.js';
import generateMail from '../utils/generate-email.js';

export const verifyEmail = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError('Hãy nhập tên và email của bạn');
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
        const { otp } = await generateMail(name, email);
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
    await Verification.findOneAndDelete({ _id: verificationInfo._id });
    res.status(StatusCodes.OK).json({ message: `Email ${email} đã xác thực thành công` });
};
