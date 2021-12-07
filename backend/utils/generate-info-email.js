import {} from 'dotenv/config.js';
import nodemailer from 'nodemailer';
import { infoEmailTemplate } from '../templates/info-email-template.js';

export const generateInfoEmail = async (email, title, greet, message) => {
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

    const template = infoEmailTemplate(title, greet, message);

    let info = await transporter
        .sendMail({
            from: 'megafunxofficial@gmail.com',
            to: email,
            subject: title,
            text: message,
            html: template,
        })
        .catch();

    return { info };
};
