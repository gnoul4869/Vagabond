import {} from 'dotenv/config.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

const generateMail = async (email) => {
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

    let mailOptions = {
        from: 'megafunxofficial@gmail.com',
        to: email,
        subject: 'OTP for Vagabond',
        text: `Hi there, Use the One-time Password ${otp} to verify and complete your account creation.`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully');
        }
    });
};

export default generateMail;
