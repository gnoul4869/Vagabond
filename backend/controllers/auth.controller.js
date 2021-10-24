import User from '../models/user.model';

const register = async (req, res) => {
    const user = await User.create(req.body);
};
