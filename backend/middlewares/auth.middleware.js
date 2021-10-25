import {} from 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/custom-api-error.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new AuthenticationError('Invalid authentication');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            throw new AuthenticationError('Invalid authentication');
        }
        req.user = { id: payload.id, name: payload.name, role: payload.role };
        next();
    });
};

export default auth;
