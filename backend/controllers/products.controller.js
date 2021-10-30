import Product from '../models/product.model.js';
import { BadRequestError, AuthenticationError, NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    if (!products) {
        throw new NotFoundError('Không tìm thấy sản phẩm nào');
    }
    res.status(StatusCodes.OK).json({ products });
};

export { getAllProducts };
