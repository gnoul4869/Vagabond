import { StatusCodes } from 'http-status-codes';
import Review from '../models/review.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';

export const getAllReviews = async (req, res) => {
    const { productID } = req.query;

    if (!productID) {
        throw new BadRequestError('Hãy cung cấp mã sản phẩm');
    }

    const query = {};
    query.createdIn = productID;

    const reviews = await Review.find(query);

    if (reviews.length === 0) {
        throw new NotFoundError('Không tìm thấy đánh giá nào');
    }

    const total = await Review.countDocuments(query);

    res.status(StatusCodes.OK).json({ total, reviews });
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

    const review = await Review.create({
        rating,
        content,
        createdIn: productID,
        createdBy: req.user.id,
    });

    res.status(StatusCodes.OK).json({ review });
};
