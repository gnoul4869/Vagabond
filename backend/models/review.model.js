import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, 'Hãy nhập điểm đánh giá'],
            min: [1, 'Điểm đánh giá không được nhỏ hơn 1'],
            max: [5, 'Điểm đánh giá không được lớn hơn 5'],
        },
        content: {
            type: String,
            required: [true, 'Hãy nhập nội dung'],
        },
        createdIn: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Hãy cung cấp mã sản phẩm'],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Hãy cung cấp mã thành viên'],
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
