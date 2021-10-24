import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
    const user = await User.create(req.body);
};
