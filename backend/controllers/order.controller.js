import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/custom-api-error';
import Order from '../models/order.model';

export const createOrder = async (req, res) => {
    const { products, shippingFee } = req.body;

    if (!products) {
        throw new BadRequestError('Giỏ hàng không được trống');
    }

    if (!shippingFee) {
        throw new BadRequestError('Hãy cung cấp phí vận chuyển');
    }

    const order = await Order.create({ createdBy: req.user.id, products, shippingFee });

    res.status(StatusCodes.CREATED).json({ order });
};
