
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || "vista5628@gmail.com",
    pass: process.env.EMAIL_PASSWORD || ""
  }
});

async function sendAlertEmail(to, subject, text) {
  const mailOptions = {
    from: `"Vista Crypto Alerts" <${process.env.EMAIL || "vista5628@gmail.com"}>`,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error);
    return false;
  }
}


module.exports = sendAlertEmail;
