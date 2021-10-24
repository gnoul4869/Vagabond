import Product from '../models/product.model.js';
import {
    BadRequestError,
    AuthenticationError,
    NotFoundError,
} from '../errors/custom-api-error.js';

const getAllProducts = async (req, res) => {
    throw new BadRequestError('This is a test');
};

export { getAllProducts };
