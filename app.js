const express = require("express");
const bodyParser = require("body-parser");
const { Admin } = require("./models/adminModel");
const { connect, close } = require("./database/connection");
const { adminRouter } = require("./routes/adminRoutes");
const { hashPassword } = require("./helpers/EncryptingPass");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
  connect().catch((e) =>
    console.log(`Error occured while connecting to mongoDB \n ${e}`)
  );
  try {
    const email = process.env.ADMIN_EMAIL;
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      console.log("Admin data already exists.");
    } else {
      const adminData = {
        username: process.env.ADMIN_NAME,
        password: hashPassword(process.env.ADMIN_PASS),
        email: process.env.ADMIN_EMAIL,
        mobile: process.env.ADMIN_MOBILE,
      };
      const data = await Admin.create(adminData);
      if (data) {
        console.log("Admin data inserted successfully.");
      } else {
        console.log("Failed to insert admin data.");
      }
    }
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    app.get("/", (req, res) => {
      res.status(200).send(
        ` <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Server Started</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
        
              .notification {
                background-color: #4caf50;
                color: #fff;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
              }
        
              .notification h1 {
                font-size: 36px;
                margin: 0;
              }
        
              .notification p {
                font-size: 18px;
                margin-top: 10px;
              }
        
              .success-icon {
                font-size: 48px;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="notification">
              <div class="success-icon">&#10004;</div>
              <h1>Server Started Successfully</h1>
              <p>
                Server is running on
                <a href="http://localhost:${port}">http://localhost:${port}</a>
              </p>
            </div>
          </body>
        </html>`
      );
    });
    app.use("/admin", adminRouter);
  }
});
