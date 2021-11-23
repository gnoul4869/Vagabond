import Product from '../models/product.model.js';
import { NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';

export const getAllProducts = async (req, res) => {
    const { productIDs } = req.query;
    const products = productIDs
        ? await Product.find({ _id: { $in: productIDs } })
        : await Product.find({});

    if (products.length === 0) {
        throw new NotFoundError('Không tìm thấy sản phẩm nào');
    }
    res.status(StatusCodes.OK).json({ products });
};

export const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
        throw new NotFoundError('Sản phẩm này không tồn tại');
    }
    res.status(StatusCodes.OK).json({ product });
};
