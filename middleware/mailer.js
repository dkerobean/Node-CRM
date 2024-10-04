const AWS = require('aws-sdk');

// Configure AWS SES credentials, region, and logger
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-north-1",
    // logger: console
});

const ses = new AWS.SES();

const sendVerificationEmail = async (to, verificationCode) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?code=${verificationCode}`;
    const emailBody = `
        <p>Hi,</p>
        <p>Your verification code is: <strong style="color: black;">${verificationCode}</strong>.</p>
        <p>Please enter this code to verify your email.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;

    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: 'Verify Your Email',
            },
            Body: {
                Html: {
                    Data: emailBody,
                },
            },
        },
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', data);
        return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending verification email. Please try again later.', error };
    }
};

module.exports = { sendVerificationEmail };
