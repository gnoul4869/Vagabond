import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
    },
    {
        timestamps: true,
    }
);

verificationSchema.options.toJSON = {
    // eslint-disable-next-line no-unused-vars
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

verificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
