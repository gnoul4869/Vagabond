import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, AuthenticationError } from '../errors/custom-api-error.js';

const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Hãy nhập email và password');
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        throw new AuthenticationError('Thông tin đăng nhập sai');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Thông tin đăng nhập sai');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: { name: user.name, role: user.role },
        token,
    });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ message: 'Đăng xuất thành công' });
};

export { register, login, logout };
