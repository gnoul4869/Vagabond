import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/custom-api-error.js';
import generateMail from '../utils/generate-email.js';

const sendToMail = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError('Hãy nhập tên và email của bạn');
    }
    const otp = generateMail(name, email);
    res.status(StatusCodes.OK).json({ message: `Đã gửi mã OTP tới ${email}` });
};

const verifyOTP = (req, res) => {
    const { email, otp } = req.body;
};

export { sendToMail, verifyOTP };
