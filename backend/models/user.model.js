import mongoose from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            minlength: 5,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide an valid email',
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
