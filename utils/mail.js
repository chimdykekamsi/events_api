const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, message) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ccc;">
        <h1 style="font-size: 24px; color: #333;">${subject}</h1>
      </div>
      <div style="padding: 20px; color: #333; line-height: 1.5;">
        <p>${message}</p>
      </div>
      <div style="text-align: center; padding: 10px 0; border-top: 1px solid #ccc;">
        <p style="font-size: 12px; color: #777;">&copy; 2024 Convene. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: '"Convene" <xpat@streetgottalent.com>',
    to,
    subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;