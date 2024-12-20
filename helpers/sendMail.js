const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {
  // Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD// Your Gmail password
  }
});
// mk app: kbgf sgyl bryk mkrf
// Define the email options
const mailOptions = {
  from: 'nhan.thanhle1308@gmail.com', // Sender's email address
  to: email, // Recipient's email address
  subject: subject, // Subject line
  html: html // Plain text body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}