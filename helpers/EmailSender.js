const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const email = "info@sanjarienglishacademy.in";
const pass = "D8VMwdiuea7g";

// Create a transporter object using the default SMTP transport

// Function to send an email
async function EmailSender(receiverEmail, subject, html) {
  const transporter = await nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: email, // your email address
      pass: pass, // your email password
    },
  });

  // Define email data
  const mailOptions = {
    from: "kingkiller22122002@gmail.com",
    to: receiverEmail,
    subject: subject,
    html: html,
  };
  try {
    // Send the email
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { EmailSender };
