import { StatusCodes } from 'http-status-codes';
import Review from '../models/review.model.js';

export const getAllReviewsInProduct = async (req, res) => {
    const { productID } = req.query;
    const reviews = await Review.find({ createdIn: productID });

    res.status(StatusCodes.OK).json({ reviews });
};
