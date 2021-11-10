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

verificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
