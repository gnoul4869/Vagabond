import {} from 'dotenv/config.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { OTPEmailTemplate } from '../templates/otp-email-template.js';

export const generateOTPEmail = async (name, email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });

    const otp = otpGenerator.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
    });

    const template = OTPEmailTemplate(name, otp);

    let info = await transporter
        .sendMail({
            from: 'megafunxofficial@gmail.com',
            to: email,
            subject: 'Mã xác thực OTP trên Vagabond',
            text: `Mã OTP của bạn là: ${otp}`,
            html: template,
        })
        .catch();

    return { otp, info };
};
