import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        provinceID: {
            type: Number,
            required: [true, 'Hãy cung cấp mã tỉnh/thành phố'],
        },
        provinceName: {
            type: String,
            required: [true, 'Hãy cung cấp tên tỉnh/thành phố'],
        },
        districtID: {
            type: Number,
            required: [true, 'Hãy cung cấp mã quận/huyện'],
        },
        districtName: {
            type: String,
            required: [true, 'Hãy cung cấp tên quận/huyện'],
        },
        wardID: {
            type: Number,
            required: [true, 'Hãy cung cấp mã phường/xã'],
        },
        wardName: {
            type: String,
            required: [true, 'Hãy cung cấp tên phường/xã'],
        },
        addressDetails: {
            type: String,
            required: [true, 'Hãy cung cấp địa chỉ cụ thể'],
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

addressSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const Address = mongoose.model('Address', addressSchema);

export default Address;
