const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @param {object} params - object of email params
 * @returns {Promise} - Promise object represents the info of the sent email
 * @description - Send email service
 */
const sendEmailService = async ({
  to,
  subject = "No Reply",
  textMessage = "",
  htmlMessage = "",
  attachments = [],
} = {}) => {
  // Configure email (transporter)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS  // generated ethereal password
    },
  });

  // Configure message (mail)
  const info = await transporter.sendMail({
    from: `No Reply <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: textMessage,
    html: htmlMessage,
    attachments,
  });

  return info;
};

/**
 * Send verification email
 * @param {string} email - recipient email address
 * @param {string} token - verification token
 */
const sendVerificationEmail = async (email, token) => {
  const subject = "Email Verification";
  const htmlMessage = `Please verify your email by clicking the following link: ${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}`;
  
  return await sendEmailService({ to: email, subject, htmlMessage });
};

/**
 * Send forgot password email
 * @param {string} email - recipient email address
 * @param {string} token - password reset token
 */
const sendForgotPasswordEmail = async (email, token) => {
  const subject = "Reset Password";
  const htmlMessage = `You can reset your password by clicking the following link: ${process.env.FRONTEND_URL}/api/auth/reset-password?token=${token}`;
  
  return await sendEmailService({ to: email, subject, htmlMessage });
};

module.exports = { sendEmailService, sendVerificationEmail, sendForgotPasswordEmail };
