import { StatusCodes } from 'http-status-codes';
import Review from '../models/review.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import Product from '../models/product.model.js';

export const getAllReviews = async (req, res) => {
    const { productID } = req.query;

    if (!productID) {
        throw new BadRequestError('Hãy cung cấp mã sản phẩm');
    }

    const query = {};
    query.createdIn = productID;

    const reviews = await Review.find(query).populate({
        path: 'createdBy',
        select: 'name image',
    });

    if (reviews.length === 0) {
        throw new NotFoundError('Không tìm thấy đánh giá nào');
    }

    const total = await Review.countDocuments(query);

    res.status(StatusCodes.OK).json({
        total,
        reviews,
    });
};

export const createReview = async (req, res) => {
    const { productID, rating, content } = req.body;

    if (!productID) {
        throw new BadRequestError('Hãy cung cấp mã sản phẩm');
    }

    if (!rating) {
        throw new BadRequestError('Hãy nhập mức đánh giá');
    }

    if (rating > 5 || rating <= 0) {
        throw new BadRequestError('Mức đánh giá không hợp lệ');
    }

    if (!content) {
        throw new BadRequestError('Hãy nhập nội dung đánh giá');
    }

    const product = await Product.findById({ _id: productID });

    if (!product) {
        throw new BadRequestError('Sản phẩm không tồn tại');
    }

    const review = await Review.create({
        rating,
        content,
        createdIn: productID,
        createdBy: req.user.id,
    });

    const productNumReviews = product.numReviews + 1;
    const estimatedRating = (product.rating + review.rating) / productNumReviews;
    const productRating = Math.round((estimatedRating + Number.EPSILON) * 100) / 100;

    console.log(estimatedRating, productRating);

    await Product.findByIdAndUpdate(
        { _id: review.createdIn },
        { rating: productRating, numReviews: productNumReviews }
    );

    res.status(StatusCodes.OK).json({ review });
};
