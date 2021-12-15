import {} from 'dotenv/config';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import Interest from '../models/interest.model.js';
import { NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';
import {
    recommend,
    preloadedProducts,
    recommendationARMatrix,
    recommendationMatrix,
} from '../utils/recommendation-system.js';

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
    const { userID } = req.query;

    const userInterests = req.query.userInterests ? JSON.parse(req.query.userInterests) : null;

    let recommendedProducts = [];

    const products = preloadedProducts
        ? preloadedProducts
        : await Product.find({}).sort('createdAt').lean();

    if (userID && recommendationMatrix.length !== 0 && recommendationARMatrix.length !== 0) {
        const users = await User.find({}).select('_id').sort('createdAt').lean();

        if (!users) {
            throw new NotFoundError('Không có users nào trong database');
        }

        const userIndex = users.findIndex((i) => i._id.toString() === userID);

        if (userIndex === -1) {
            throw new NotFoundError('User không tồn tại');
        }

        const kUsers = Number(process.env.K_USERS) || 10;

        const recommendation = recommend(userIndex, kUsers);

        if (recommendation.length !== 0) {
            recommendation.forEach((element) => {
                recommendedProducts.push(products[element.itemIndex]);
            });
        }
    }

    if (recommendedProducts.length < 6) {
        if (userID) {
            const interest = await Interest.findOne({ user: userID }).select('products').lean();

            if (interest && interest.products.length !== 0) {
                const recommendedProductsSet =
                    recommendedProducts.length !== 0
                        ? new Set(recommendedProducts.map((item) => item._id.toString()))
                        : null;

                console.log(recommendedProductsSet);
                const interestedProducts = recommendedProductsSet
                    ? interest.products
                          .filter((item) => !recommendedProductsSet.has(item.product.toString()))
                          .sort((a, b) => b.point - a.point)
                          .slice(0, 6 - recommendedProducts.length)
                    : interest.products
                          .sort((a, b) => b.point - a.point)
                          .slice(0, 6 - recommendedProducts.length);

                console.log(interestedProducts);

                interestedProducts.forEach((element) => {
                    const iProduct = products.find((item) => item._id.equals(element.product));

                    if (iProduct) {
                        recommendedProducts.push(iProduct);
                    }
                });
            }
        } else if (userInterests) {
            const recommendedProductsSet =
                recommendedProducts.length !== 0
                    ? new Set(recommendedProducts.map((item) => item._id.toString()))
                    : null;

            const interestedProducts = recommendedProductsSet
                ? userInterests
                      .filter((item) => !recommendedProductsSet.has(item.product.toString()))
                      .sort((a, b) => b.point - a.point)
                      .slice(0, 6 - recommendedProducts.length)
                : userInterests
                      .sort((a, b) => b.point - a.point)
                      .slice(0, 6 - recommendedProducts.length);

            interestedProducts.forEach((element) => {
                const iProduct = products.find((item) => item._id.toString() === element.product);

                if (iProduct) {
                    recommendedProducts.push(iProduct);
                }
            });
        }
    }

    if (recommendedProducts.length < 6) {
        const recommendedProductsSet =
            recommendedProducts.length !== 0
                ? new Set(recommendedProducts.map((item) => item._id))
                : null;

        const topProducts = recommendedProductsSet
            ? products
                  .filter((item) => !recommendedProductsSet.has(item._id))
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 6 - recommendedProducts.length)
            : products.sort((a, b) => b.rating - a.rating).slice(0, 6 - recommendedProducts.length);

        recommendedProducts = recommendedProducts.concat(topProducts);
    }

    if (recommendedProducts.length !== 0) {
        recommendedProducts = recommendedProducts.map((item) => {
            return { ...item, id: item._id };
        });
    }

    res.status(StatusCodes.OK).json({
        total: recommendedProducts.length,
        products: recommendedProducts,
    });
};
