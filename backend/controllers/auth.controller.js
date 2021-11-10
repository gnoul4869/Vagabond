import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, AuthenticationError } from '../errors/custom-api-error.js';
import generateMail from '../utils/generateEmail.js';

const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({
        userInfo: {
            name: user.name,
            email: user.email,
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
        throw new AuthenticationError('Tên tài khoản hoặc mật khẩu của bạn không đúng');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Tên tài khoản hoặc mật khẩu của bạn không đúng');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        userInfo: {
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.role,
            image: user.image,
            token: token,
        },
    });
};

const verifyEmail = async (req, res) => {
    const { name, email } = req.body;
    const info = await generateMail(name, email);
    res.status(StatusCodes.OK).json({ message: info });
};

export { register, login, verifyEmail };
