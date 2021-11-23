import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Hãy cung cấp mã thành viên'],
    },
    status: {
        type: String,
        enum: ['pending', 'shipping', 'completed', 'cancelled'],
        default: 'pending',
    },
    products: [
        {
            productID: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Hãy cung cấp mã sản phẩm'],
            },
            orderedQty: {
                type: Number,
                required: [true, 'Hãy cung cấp số lượng sản phẩm'],
            },
        },
    ],
    shippingFee: {
        type: Number,
        required: [true, 'Hãy cung cấp phí vận chuyển'],
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
