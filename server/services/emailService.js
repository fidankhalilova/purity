const nodemailer = require('nodemailer');

console.log('=== EMAIL SERVICE CONFIGURATION ===');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '********' : 'NOT SET');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails');
    }
});

const sendPasswordResetEmail = async (email, resetToken, userName) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: `"Purity" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Reset Your Password - Purity',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Password</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        color: #1f2937;
                        background-color: #f9fafb;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px 20px;
                    }
                    .card {
                        background: #ffffff;
                        border-radius: 24px;
                        padding: 40px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e5e7eb;
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 32px;
                    }
                    .logo h1 {
                        font-size: 28px;
                        font-weight: bold;
                        color: #1f473e;
                        margin: 0;
                    }
                    .content {
                        text-align: center;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1f2937;
                        margin-bottom: 16px;
                    }
                    .message {
                        color: #6b7280;
                        margin-bottom: 32px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #1f473e;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 12px 32px;
                        border-radius: 9999px;
                        font-weight: 600;
                        font-size: 16px;
                        margin: 16px 0;
                        transition: background-color 0.3s;
                    }
                    .button:hover {
                        background-color: #163830;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 1px solid #e5e7eb;
                        font-size: 12px;
                        color: #9ca3af;
                    }
                    .link {
                        word-break: break-all;
                        color: #1f473e;
                        text-decoration: none;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card">
                        <div class="logo">
                            <h1>Purity</h1>
                        </div>
                        <div class="content">
                            <h2 class="title">Reset Your Password</h2>
                            <p class="message">
                                Hello ${userName || 'there'},<br><br>
                                We received a request to reset the password for your Purity account.
                                Click the button below to create a new password. This link will expire in 1 hour.
                            </p>
                            <a href="${resetUrl}" class="button">Reset Password</a>
                            <p class="message" style="font-size: 14px; margin-top: 24px;">
                                If you didn't request this, please ignore this email.<br>
                                Your password will remain unchanged.
                            </p>
                            <p style="font-size: 12px; color: #9ca3af; margin-top: 16px;">
                                Or copy and paste this link:<br>
                                <a href="${resetUrl}" class="link">${resetUrl}</a>
                            </p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Purity. All rights reserved.</p>
                            <p>This is an automated message, please do not reply.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        return false;
    }
};

const sendContactEmail = async (name, email, subject, message) => {
    console.log('Preparing contact email from:', email);
    console.log('Subject:', subject);

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: 'fidankhalilova295@gmail.com',
        subject: `Contact Form: ${subject}`,
        replyTo: email,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Submission</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        color: #1f2937;
                        background-color: #f9fafb;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px 20px;
                    }
                    .card {
                        background: #ffffff;
                        border-radius: 24px;
                        padding: 40px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e5e7eb;
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 32px;
                    }
                    .logo h1 {
                        font-size: 28px;
                        font-weight: bold;
                        color: #1f473e;
                        margin: 0;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1f2937;
                        margin-bottom: 16px;
                        text-align: center;
                    }
                    .info-section {
                        background-color: #f3f4f6;
                        border-radius: 16px;
                        padding: 20px;
                        margin: 24px 0;
                    }
                    .info-row {
                        margin-bottom: 12px;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #1f473e;
                        margin-bottom: 4px;
                    }
                    .info-value {
                        color: #4b5563;
                    }
                    .message-section {
                        margin: 24px 0;
                    }
                    .message-label {
                        font-weight: 600;
                        color: #1f473e;
                        margin-bottom: 8px;
                    }
                    .message-content {
                        background-color: #f9fafb;
                        border-left: 3px solid #1f473e;
                        padding: 16px;
                        border-radius: 8px;
                        color: #374151;
                        white-space: pre-wrap;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 1px solid #e5e7eb;
                        font-size: 12px;
                        color: #9ca3af;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card">
                        <div class="logo">
                            <h1>Purity</h1>
                        </div>
                        <h2 class="title">New Contact Form Submission</h2>
                        
                        <div class="info-section">
                            <div class="info-row">
                                <div class="info-label">Name:</div>
                                <div class="info-value">${name}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Email:</div>
                                <div class="info-value">${email}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Subject:</div>
                                <div class="info-value">${subject}</div>
                            </div>
                        </div>
                        
                        <div class="message-section">
                            <div class="message-label">Message:</div>
                            <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                        
                        <div class="footer">
                            <p>This message was sent from your website's contact form.</p>
                            <p>You can reply directly to ${email}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        console.log('Attempting to send contact email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Contact email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending contact email:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        return false;
    }
};

module.exports = { sendPasswordResetEmail, sendContactEmail };