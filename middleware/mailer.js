// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.dreamhost.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (to, code) => {
    const verificationLink = `http://localhost:5001/api/verify-email?token=${code}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${code}. Please enter this code to verify your email.`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
