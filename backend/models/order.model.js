import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['pending', 'shipping', 'delivered', 'cancelled'],
            default: 'pending',
        },
        user: {
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: [true, 'Hãy cung cấp mã thành viên'],
            },
            name: {
                type: String,
                required: [true, 'Hãy cung cấp tên thành viên'],
                minlength: [5, 'Tên không thể có ít hơn 5 ký tự'],
                maxlength: [40, 'Tên không thể có nhiều hơn 40 ký tự'],
            },
            phoneNumber: {
                type: String,
                required: [true, 'Hãy cung cấp số điện thoại'],
                minlength: [10, 'Số điện thoại không hợp lệ'],
                maxlength: [10, 'Số điện thoại không hợp lệ'],
            },
            address: {
                provinceName: {
                    type: String,
                    required: [true, 'Hãy cung cấp tên tỉnh/thành phố'],
                },

                districtName: {
                    type: String,
                    required: [true, 'Hãy cung cấp tên quận/huyện'],
                },
                wardName: {
                    type: String,
                    required: [true, 'Hãy cung cấp tên phường/xã'],
                },
                addressDetails: {
                    type: String,
                    required: [true, 'Hãy cung cấp địa chỉ cụ thể'],
                },
            },
        },
        products: [
            {
                current: {
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
        priority: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
