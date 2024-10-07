const AWS = require('aws-sdk');

// Configure AWS SES credentials, region, and logger
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-north-1",
    // logger: console
});

const ses = new AWS.SES();

const sendTaskNotificationEmail = async (to, taskName, dueDate) => {
    const emailBody = `
        <p>Hi,</p>
        <p>You have been assigned a new task: <strong style="color: black;">${taskName}</strong>.</p>
        <p>Due Date: <strong style="color: black;">${new Date(dueDate).toLocaleDateString()}</strong>.</p>
        <p>Please check your task list for more details.</p>
    `;

    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: 'New Task Assigned',
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
        return { success: true, message: 'Task notification email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending task notification email. Please try again later.', error };
    }
};

module.exports = { sendTaskNotificationEmail };
