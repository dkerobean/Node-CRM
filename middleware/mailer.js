const nodemailer = require('nodemailer');
console.log(process.env.EMAIL_USER)
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
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
        to: to,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${verificationCode}. Please enter this code to verify your email.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(process.env.EMAIL_USER)
        return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending verification email. Please try again later.', error };
    }
};

module.exports = { sendVerificationEmail };
