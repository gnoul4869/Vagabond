import {} from 'dotenv/config.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { emailTemplate } from './emailTemplate.js';

const generateMail = async (name, email) => {
    console.log(name, email);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
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

    const template = emailTemplate(name, otp);

    let info = transporter.sendMail({
        from: 'megafunxofficial@gmail.com',
        to: email,
        subject: 'OTP for Vagabond',
        text: `Mã OTP của bạn là: ${otp}`,
        html: template,
    });

    return info;
};

export default generateMail;
