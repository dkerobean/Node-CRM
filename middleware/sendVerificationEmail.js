const nodemailer = require('nodemailer');

require('dotenv').config();

// Create a transporter using DreamHost SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.dreamhost.com'
    port: process.env.SMTP_PORT, // e.g., 465 for SSL or 587 for TLS
    secure: process.env.SMTP_SECURE === 'true', // true for SSL, false for TLS/STARTTLS
    auth: {
        user: process.env.SMTP_USER, // Your DreamHost SMTP username (usually your email)
        pass: process.env.SMTP_PASS, // Your DreamHost SMTP password
    },
});

const sendVerificationEmail = async (to, verificationCode) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?code=${verificationCode}`;
    const emailBody = `
        <p>Hi,</p>
        <p>Your verification code is: <strong style="color: black;">${verificationCode}</strong>.</p>
        <p>Please enter this code to verify your email.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;

    const mailOptions = {
        from: process.env.EMAIL_FROM, // Sender address (must be a valid email in your domain)
        to: to, // Recipient email address
        subject: 'Verify Your Email',
        html: emailBody, // HTML email body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending verification email. Please try again later.', error };
    }
};

module.exports = { sendVerificationEmail };
