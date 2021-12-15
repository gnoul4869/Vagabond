import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
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
    const greet = 'Thông báo';
    const message = `Có đơn hàng mới (Mã ĐH: ${order.id.toUpperCase()}) đang chờ xác nhận. Hãy vào trang quản lý để cập nhật trạng thái đơn hàng.`;
    generateInfoEmail(process.env.OWNER_MAIL, title, greet, message);

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
        .populate({ path: 'products.product', select: 'reviewers' });

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

    const order = await Order.findById(orderID);

    if (status === 'cancelled' && req.user.role !== 'admin') {
        if (order.status !== 'pending') {
            throw new BadRequestError('Bạn không thể hủy đơn hàng đã được xác nhận');
        }
    }

    const priority =
        status === 'pending' ? 0 : status === 'shipping' ? 1 : status === 'delivered' ? 2 : 3;

    const newOrder = await Order.findByIdAndUpdate(
        orderID,
        { status, priority },
        {
            runValidators: true,
        }
    ).populate({ path: 'products.product', select: 'reviewers' });

    if (!newOrder) {
        throw new NotFoundError('Không tìm thấy đơn hàng nào');
    }

    const count =
        newOrder.status === 'pending' && status === 'shipping'
            ? -1
            : newOrder.status === 'shipping' && status === 'cancelled'
            ? 1
            : 0;

    if (count !== 0) {
        for (const product of newOrder.products) {
            await Product.findByIdAndUpdate(
                product.productID,
                {
                    $inc: { countInStock: product.qty * count, numSales: product.qty },
                    $push: { reviewers: newOrder.user.id },
                },
                {
                    runValidators: true,
                }
            );
        }
    }

    const user = await User.findById(newOrder.user.id);

    if (user) {
        let title;
        let greet;
        let message;

        if (order.status === 'pending' && status === 'shipping') {
            title = 'Đơn hàng xác nhận thành công';
            greet = `Xin chào ${user.name}`;
            message = `Đơn hàng của bạn đã được nhân viên xác nhận. Bạn có thể theo dõi trạng thái đơn hàng tại trang đơn mua.`;
        } else if (order.status === 'shipping' && status === 'delivered') {
            title = 'Cảm ơn bạn đã mua hàng tại Vagabond';
            greet = `Xin chào ${user.name}`;
            message = `Cảm ơn bạn đã mua hàng tại Vagabond. Nếu bạn cảm thấy hài lòng với sản phẩm của mình, hãy để lại đánh giá trên website nhé.`;
        } else if (order.user.id.toString() !== req.user.id && status === 'cancelled') {
            title = 'Đơn hàng của bạn đã bị hủy';
            greet = `Xin chào ${user.name}`;
            message = `Đơn hàng của bạn đã bị hủy bởi nhân viên. Nếu bạn cảm thấy đây không phải là lỗi của bạn, hãy thử đặt hàng lại nhé.`;
        }

        if (title && greet && message) {
            generateInfoEmail(user.email, title, greet, message);
        }
    }

    res.status(StatusCodes.OK).json({
        order: { ...newOrder.toJSON(), status: status, priority: priority },
    });
};
