import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Hãy nhập tên của sản phẩm'],
        },
        category: {
            type: String,
            required: [true, 'Hãy nhập loại hàng của sản phẩm'],
        },
        brand: {
            type: String,
            default: 'No brand',
        },
        price: {
            type: Number,
            required: [true, 'Hãy nhập giá của sản phẩm'],
        },
        countInStock: {
            type: Number,
            default: 1,
        },
        weight: {
            type: Number,
            default: 1000,
        },
        description: {
            type: String,
            default: 'Không có miêu tả nào',
        },
        images: {
            type: Array,
            default: ['/images/product_picture.jpg'],
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        // createdBy: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'User',
        //     required: [true, 'Please provide a user'],
        // },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
