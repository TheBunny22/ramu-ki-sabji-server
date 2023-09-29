const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.EMAIL_MAILER;
const pass = process.env.EMAIL_PASS;

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: email, // your email address
    pass: pass, // your email password
  },
});

// Function to send an email
function EmailSender(receiverEmail, subject, html) {
  // Define email data
  const mailOptions = {
    from: "kingkiller22122002@gmail.com",
    to: receiverEmail,
    subject: subject,
    html: html,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { EmailSender };
