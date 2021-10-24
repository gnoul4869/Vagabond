import User from '../models/user.model';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = await User.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
