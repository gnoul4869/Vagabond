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
            default: 'Noname',
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
            min: [0, 'Điểm đánh giá không được nhỏ hơn 0'],
            max: [5, 'Điểm đánh giá không được lớn hơn 5'],
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviewers: {
            type: Array,
            default: [],
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

productSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const Product = mongoose.model('Product', productSchema);

export default Product;
