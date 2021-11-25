import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
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

export const getUserOrders = async (req, res) => {
    const status = req.query.status;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    const skip = (page - 1) * limit;
    const query = {};

    query.createdBy = req.user.id;
    if (status) {
        query.status = status;
    }

    const orders = await Order.find(query).sort({ createdAt: 'desc' }).limit(limit).skip(skip);

    if (!orders) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    const total = await Order.countDocuments(query);

    res.status(StatusCodes.OK).json({ total, orders });
};

export const getAllOrders = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new AuthenticationError('Không đủ quyền thực hiện');
    }
    const { status } = req.query;
    const orders = status
        ? await Order.find({ status })
        : await Order.find({}).sort({ createdAt: 'desc' });

    if (!orders) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    res.status(StatusCodes.OK).json({ orders });
};
