const nodemailer = require('nodemailer');

function sendResetEmail(userEmail, resetLink) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'JameabirdTAT@gmail.com',
            pass: 'ersm htru rsee ebzb'
        }
    });

    transporter.verify((error) => {
        if (error) {
            console.error('SMTP connection failed:', error.message);
            return;
        }

        const mailOptions = {
            from: 'JameabirdTAT@gmail.com',
            to: userEmail,
            subject: 'Password Reset Request',
            text: `Please use the following code to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Failed to send email: ${error.message}`);
            } else {
                console.log('Reset email sent successfully!', info.response);
            }
        });
    });
}

module.exports = sendResetEmail;
