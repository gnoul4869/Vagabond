import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Hãy cung cấp mã thành viên'],
        },
        status: {
            type: String,
            enum: ['pending', 'shipping', 'delivered', 'cancelled'],
            default: 'pending',
        },
        products: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Hãy cung cấp mã sản phẩm'],
                },
                name: {
                    type: String,
                    required: [true, 'Hãy cung cấp tên sản phẩm'],
                },
                price: {
                    type: Number,
                    required: [true, 'Hãy cung cấp giá sản phẩm'],
                },
                image: {
                    type: String,
                    required: [true, 'Hãy cung cấp hình ảnh sản phẩm'],
                },
                qty: {
                    type: Number,
                    required: [true, 'Hãy cung cấp số lượng sản phẩm'],
                },
            },
        ],
        shippingFee: {
            type: Number,
            required: [true, 'Hãy cung cấp phí vận chuyển'],
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
