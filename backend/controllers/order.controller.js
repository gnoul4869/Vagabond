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
    const queryObj = {};

    queryObj.createdBy = req.user.id;
    if (status) {
        queryObj.status = status;
    }

    const orders = await Order.find(queryObj).sort({ updatedAt: -1 }).limit(limit).skip(skip);

    if (!orders) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    const total = await Order.countDocuments(queryObj);

    res.status(StatusCodes.OK).json({ total, orders });
};

export const getAllOrders = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new AuthenticationError('Không đủ quyền thực hiện');
    }
    const status = req.query.status;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    const skip = (page - 1) * limit;
    const queryObj = {};

    if (status) {
        queryObj.status = status;
    }

    const orders = await Order.find(queryObj).sort({ updatedAt: -1 }).limit(limit).skip(skip);

    if (!orders) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    const total = await Order.countDocuments(queryObj);

    res.status(StatusCodes.OK).json({ total, orders });
};

export const updateOrder = async (req, res) => {
    const { orderID, status } = req.body;

    if (!orderID) {
        throw new BadRequestError('Hay cung cấp mã đơn hàng');
    }

    if (!status) {
        throw new BadRequestError('Hãy cung cấp trạng thái đơn hàng');
    }

    const queryObj = {};
    queryObj._id = orderID;

    if (req.user.role !== 'admin') {
        queryObj.createdBy = req.user.id;
    }

    const order = await Order.findOneAndUpdate(
        queryObj,
        { status },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!order) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    res.status(StatusCodes.OK).json({ order });
};
