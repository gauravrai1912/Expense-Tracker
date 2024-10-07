const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can change this to any other email service like SMTP.
  auth: {
    user: process.env.EMAIL_USER,  // Load from .env
    pass: process.env.EMAIL_PASS,  // Load from .env
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
      // Sender's email
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
