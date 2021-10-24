import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a user'],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
