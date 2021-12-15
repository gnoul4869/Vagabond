import {} from 'dotenv/config';
import Product from '../models/product.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';
import { recommend } from '../utils/recommendation-system.js';
import User from '../models/user.model.js';

export const getAllProducts = async (req, res) => {
    const { productIDs, excludeIDs, search, sort, category, maxPrice, minPrice } = req.query;

    const query = {};

    if (productIDs || excludeIDs) {
        query._id =
            productIDs && excludeIDs
                ? { $in: productIDs, $nin: excludeIDs }
                : productIDs
                ? { $in: productIDs }
                : { $nin: excludeIDs };
    }

    if (search) {
        const searchRegExp = new RegExp(search, 'i');
        query.$or = [
            { name: searchRegExp },
            { brand: searchRegExp },
            { description: searchRegExp },
        ];
    }

    if (category) {
        query.category = category;
    }

    if (maxPrice || minPrice) {
        query.price = { $lte: maxPrice, $gte: minPrice };
    }

    const sortValue =
        sort === 'relevance'
            ? 'name'
            : sort === 'newest'
            ? '-createdAt'
            : sort === 'sales'
            ? '-numSales'
            : sort === 'price-asc'
            ? 'price'
            : sort === 'price-desc'
            ? '-price'
            : sort === 'rating'
            ? {
                  rating: -1,
                  numReviews: -1,
              }
            : '';

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).sort(sortValue).limit(limit).skip(skip);

    if (products.length === 0) {
        throw new NotFoundError('Không tìm thấy sản phẩm nào');
    }

    const total = await Product.countDocuments(query);

    res.status(StatusCodes.OK).json({ total, products });
};

export const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Sản phẩm này không tồn tại');
    }
    res.status(StatusCodes.OK).json({ product });
};

export const getProductCategories = async (req, res) => {
    const categories = await Product.distinct('category');
    if (!categories) {
        throw new NotFoundError('Không có danh mục nào');
    }
    res.status(StatusCodes.OK).json({ categories });
};

export const getRecommendedProducts = async (req, res) => {
    if (global.recommendationMatrix.length === 0 || global.recommendationARMatrix.length === 0) {
        throw new BadRequestError('Matrix chưa được khởi tạo');
    }

    const users = await User.find({}).select('_id').sort('createdAt').lean();

    if (!users) {
        throw new NotFoundError('Không có users nào trong database');
    }

    const userIndex = users.findIndex((i) => i._id.toString() === req.user.id);

    if (userIndex === -1) {
        throw new NotFoundError('User không tồn tại');
    }

    const kUsers = process.env.K_USERS || 10;
    const recommendedProducts = recommend(userIndex, kUsers);

    res.status(StatusCodes.OK).json({ recommendedProducts });
};
