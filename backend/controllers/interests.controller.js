import Interest from '../models/interest.model.js';
import { BadRequestError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';

export const getUserInterests = async (req, res) => {
    let interest = await Interest.findOne({ user: req.user.id });

    if (!interest) {
        interest = await Interest.create({ user: req.user.id, products: [] });
    }

    res.status(StatusCodes.OK).json({ interest });
};

export const addInterest = async (req, res) => {
    const { products } = req.body;

    if (products.length === 0) {
        throw new BadRequestError('Hãy cung cấp danh sách sản phẩm');
    }

    let interest = await Interest.findOneAndUpdate({ user: req.user.id, products });

    if (!interest) {
        interest = await Interest.create({ user: req.user.id, products });
    }

    res.status(StatusCodes.OK).json({ interest });
};
