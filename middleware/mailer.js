const nodemailer = require('nodemailer');

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.EMAIL_HOST);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    debug: true,
    logger: true,
});

const sendVerificationEmail = async (to, verificationCode) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?code=${verificationCode}`;
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${verificationCode}. Please enter this code to verify your email.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Verification email sent successfully.' };
        console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.EMAIL_HOST);
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending verification email. Please try again later.', error };
    }
};

module.exports = { sendVerificationEmail };
