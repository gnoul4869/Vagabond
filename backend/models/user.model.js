import {} from 'dotenv/config.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Hãy nhập tên của bạn'],
            minlength: 5,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Hãy nhập email của bạn'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide an valid email',
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Hãy nhập mật khẩu của bạn'],
            minlength: 6,
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
    return jwt.sign({ id: this._id, name: this.name, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

const User = mongoose.model('User', userSchema);

export default User;
