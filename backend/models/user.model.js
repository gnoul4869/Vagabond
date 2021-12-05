import {} from 'dotenv/config.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Hãy nhập email của bạn'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Email không hợp lệ',
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Hãy nhập mật khẩu của bạn'],
            match: [
                /^((?=.*[a-z])|(?=.*[A-Z]))(?=.*[0-9])(?=.{6,})/,
                'Hãy sử dụng một mật khẩu khó hơn',
            ],
        },
        name: {
            type: String,
            required: [true, 'Hãy nhập tên của bạn'],
            minlength: [5, 'Tên không thể có ít hơn 5 ký tự'],
            maxlength: [40, 'Tên không thể có nhiều hơn 40 ký tự'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Hãy nhập số điện thoại của bạn'],
            minlength: [10, 'Số điện thoại của bạn không hợp lệ'],
            maxlength: [10, 'Số điện thoại của bạn không hợp lệ'],
        },
        gender: {
            type: String,
            enum: ['Nam', 'Nữ', 'Khác'],
            required: [true, 'Hãy chọn giới tính của bạn'],
        },
        birthDate: {
            type: Date,
            required: [true, 'Hãy nhập ngày sinh của bạn'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        image: {
            type: String,
            default: '/images/user_profile_picture.jpg',
        },
        address: {
            type: mongoose.Types.ObjectId,
            ref: 'Address',
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJWT = function () {
    console.log(this._id, this.email);
    return jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

userSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

const User = mongoose.model('User', userSchema);

export default User;
