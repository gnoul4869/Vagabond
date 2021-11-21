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
            required: [true, 'Hãy cung cấp mã Phường/Xã'],
        },
        wardName: {
            type: String,
            required: [true, 'Hãy cung cấp tên Phường/Xã'],
        },
        detailAddress: {
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

const Address = mongoose.model('Address', addressSchema);

export default Address;
