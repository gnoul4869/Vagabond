import Product from '../models/product.model.js';
import { NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';

export const getAllProducts = async (req, res) => {
    const { productIDs, sort, category } = req.query;

    const query = {};

    if (productIDs) {
        query._id = { $in: productIDs };
    }

    if (category) {
        query.category = category;
    }

    const sortValue =
        sort === 'relevance'
            ? 'name'
            : sort === 'newest'
            ? 'createdAt'
            : sort === 'sales'
            ? 'numReivews'
            : sort === 'price-asc'
            ? 'price'
            : sort === 'price-desc'
            ? '-price'
            : '';

    const products = await Product.find(query).sort(sortValue);

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

export const getProductCategories = async (req, res) => {
    const categories = await Product.distinct('category').sort;
    if (!categories) {
        throw new NotFoundError('Không có danh mục nào');
    }
    res.status(StatusCodes.OK).json({ categories });
};
