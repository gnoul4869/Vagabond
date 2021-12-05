import {} from 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/custom-api-error.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new AuthenticationError('Xác thực thất bại');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            throw new AuthenticationError('Xác thực thất bại');
        }

        req.user = { id: payload.id, email: payload.email, name: payload.name, role: payload.role };
        next();
    });
};

export default auth;
