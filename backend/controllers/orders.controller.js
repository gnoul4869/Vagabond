import { StatusCodes } from 'http-status-codes';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import { AuthenticationError, BadRequestError, NotFoundError } from '../errors/custom-api-error.js';
import { generateInfoEmail } from '../utils/generate-info-email.js';

export const createOrder = async (req, res) => {
    const { products, shippingFee } = req.body;

    if (!req.body.user) {
        throw new BadRequestError('Hãy cung cấp thông tin người đặt hàng');
    }

    const user = { ...req.body.user, id: req.user.id };

    if (products.length === 0) {
        throw new BadRequestError('Giỏ hàng không được trống');
    }

    if (!shippingFee) {
        throw new BadRequestError('Hãy cung cấp phí vận chuyển');
    }

    const order = await Order.create({ user, products, shippingFee });

    const title = 'Thông báo có đơn hàng mới';
    const message = `Có đơn hàng mới (Mã ĐH: ${order.id.toUpperCase()}) đang chờ xác nhận. Hãy vào trang quản lý để cập nhật trạng thái đơn hàng.`;
    await generateInfoEmail(process.env.OWNER_MAIL, title, message);

    res.status(StatusCodes.CREATED).json({ order });
};

export const getAllOrders = async (req, res) => {
    const isAdmin = req.query.isAdmin;
    const status = req.query.status;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    const skip = (page - 1) * limit;
    const query = {};

    if (isAdmin === 'true' && req.user.role !== 'admin') {
        throw new AuthenticationError('Không đủ quyền thực hiện');
    }
    if (isAdmin === 'false') {
        query['user.id'] = req.user.id;
    }

    if (status) {
        query.status = status;
    }

    const orders = await Order.find(query)
        .sort({ priority: 1, updatedAt: -1 })
        .limit(limit)
        .skip(skip)
        .populate({ path: 'products.current', select: 'reviewers' });

    if (orders.length === 0) {
        throw new NotFoundError('Không có đơn hàng nào');
    }

    const total = await Order.countDocuments(query);

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

    const statuses = ['pending', 'cancelled', 'shipping', 'delivered'];

    if (!statuses.includes(status)) {
        throw new BadRequestError('Trạng thái đơn hàng không hợp lệ');
    }

    if (status !== 'cancelled' && req.user.role !== 'admin') {
        throw new AuthenticationError('Không đủ quyền thực hiện');
    }

    const query = {};
    query._id = orderID;

    if (req.user.role !== 'admin') {
        query['user.id'] = req.user.id;
    }

    const priority =
        status === 'pending' ? 0 : status === 'shipping' ? 1 : status === 'delivered' ? 2 : 3;

    const order = await Order.findOneAndUpdate(
        query,
        { status, priority },
        {
            runValidators: true,
        }
    ).populate({ path: 'products.current', select: 'reviewers' });

    if (!order) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    const count =
        order.status === 'pending' && status === 'shipping'
            ? -1
            : order.status === 'shipping' && status === 'cancelled'
            ? 1
            : 0;

    if (count !== 0) {
        for (const product of order.products) {
            await Product.findByIdAndUpdate(
                { _id: product.current.id },
                { $inc: { countInStock: product.qty * count }, $push: { reviewers: req.user.id } },
                {
                    runValidators: true,
                }
            );
        }
    }

    res.status(StatusCodes.OK).json({
        order: { ...order.toJSON(), status: status, priority: priority },
    });
};
