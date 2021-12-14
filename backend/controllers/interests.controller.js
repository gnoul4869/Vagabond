import Interest from '../models/interest.model.js';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes';

export const addInterest = async (req, res) => {
    const { products } = req.body;

    if (products.length === 0) {
        throw new BadRequestError('Hãy cung cấp danh sách sản phẩm');
    }

    const interest = await Interest.create({ user: req.user.id, products });

    res.status(StatusCodes.OK).json({ interest });
};

export const updateInterest = async (req, res) => {
    const { products } = req.body;

    if (products.length === 0) {
        throw new BadRequestError('Hãy cung cấp danh sách sản phẩm');
    }

    const interest = await Interest.findOneAndUpdate({ user: req.user.id, products });

    if (!interest) {
        throw new NotFoundError('Không tìm thấy interest nào');
    }

    res.status(StatusCodes.OK).json({ interest });
};
