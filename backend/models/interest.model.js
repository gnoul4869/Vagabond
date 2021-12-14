import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Hãy cung cấp mã thành viên'],
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Hãy cung cấp mã sản phẩm'],
            },
            priority: {
                type: Number,
                default: 1,
            },
        },
    ],
});

interestSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const Interest = mongoose.model('Interest', interestSchema);

export default Interest;
