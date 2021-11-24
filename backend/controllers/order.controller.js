import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
    const { products, shippingFee } = req.body;

    if (products.length === 0) {
        throw new BadRequestError('Giỏ hàng không được trống');
    }

    if (!shippingFee) {
        throw new BadRequestError('Hãy cung cấp phí vận chuyển');
    }

    const order = await Order.create({ createdBy: req.user.id, products, shippingFee });

    res.status(StatusCodes.CREATED).json({ order });
};

export const getAllOrders = async (req, res) => {
    const { status } = req.query;
    const orders = status ? await Order.find({ status }) : await Order.find({});

    if (!orders) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    res.status(StatusCodes.OK).json({ orders });
};
