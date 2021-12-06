import { StatusCodes } from 'http-status-codes';
import Review from '../models/review.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import Product from '../models/product.model.js';

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

    await Product.findByIdAndUpdate(
        { _id: review.createdIn },
        { rating: productRating, numReviews: productNumReviews }
    );

    res.status(StatusCodes.OK).json({
        review: {
            ...review.toJSON(),
            createdBy: { name: req.user.name, image: req.user.image, id: req.user.id },
        },
    });
};

export const getAllReviews = async (req, res) => {
    const { productID, rating, likedBy } = req.query;

    if (!productID) {
        throw new BadRequestError('Hãy cung cấp mã sản phẩm');
    }

    const query = {};
    query.createdIn = productID;
    if (rating) {
        query.rating = rating;
    }
    if (likedBy) {
        query.likedBy = likedBy;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const reviews = await Review.find(query)
        .populate({
            path: 'createdBy',
            select: 'name image',
        })
        .sort('-createdAt')
        .limit(limit)
        .skip(skip);

    if (reviews.length === 0) {
        throw new NotFoundError('Không tìm thấy đánh giá nào');
    }

    const total = await Review.countDocuments(query);

    res.status(StatusCodes.OK).json({
        total,
        reviews,
    });
};

export const updateReview = async (req, res) => {
    const { reviewID, action } = req.body;

    if (!reviewID) {
        throw new BadRequestError('Hãy cung cấp mã đánh giá');
    }

    if (!action) {
        throw new BadRequestError('Hãy cung cấp hành động cập nhật');
    }

    const actions = ['like'];

    if (!actions.includes(action)) {
        throw new BadRequestError('Hành động cập nhật không hợp lệ');
    }

    const review = await Review.findById({ _id: reviewID });

    if (!review) {
        throw new NotFoundError('Đánh giá không tồn tại');
    }

    const query = {};
    if (!review.likedBy.includes(req.user.id)) {
        query.$inc = { numLikes: 1 };
        query.$push = { likedBy: req.user.id };
    } else {
        query.$inc = { numLikes: -1 };
        query.$pull = { likedBy: req.user.id };
    }

    const newReview = await Review.findByIdAndUpdate({ _id: reviewID }, query, {
        new: true,
        runValidators: true,
    }).populate({ path: 'createdBy', select: 'name image' });

    res.status(StatusCodes.OK).json({ review: newReview });
};
