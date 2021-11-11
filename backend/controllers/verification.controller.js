import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, BadRequestError } from '../errors/custom-api-error.js';
import Verification from '../models/verification.model.js';
import generateMail from '../utils/generate-email.js';

const verifyEmail = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError('Hãy nhập tên và email của bạn');
    }
    const otp = generateMail(name, email);
    const verificationInfo = await Verification.create({ email, otp });
    res.status(StatusCodes.OK).json({
        verificationInfo,
        message: `Đã gửi mã OTP tới email ${email}`,
    });
};

const confirmEmail = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new BadRequestError('Email hoặc OTP không được để trống');
    }
    const verificationInfo = await Verification.findOne({ email, otp });
    if (!verificationInfo) {
        throw new AuthenticationError('Mã OTP không đúng');
    }
    await Verification.findOneAndDelete({ _id: verificationInfo._id });
    res.status(StatusCodes.OK).json({ message: `Email ${email} đã xác thực thành công` });
};

export { verifyEmail, confirmEmail };
