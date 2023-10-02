const OtpMailGenerator = (email, username, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ramu ki Sabji - OTP Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #ffffff;
                margin: 0;
                padding: 0;
            }
    
            .container {
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 400px;
                margin: 20px auto;
                text-align: center;
            }
    
            .logo {
                color: #fbaf32;
                font-size: 24px;
                font-weight: bold;
            }
    
            
            .otp-code {
                font-size: 32px;
                color: #719a0a;
                margin: 20px 0;
            }
    
            .message {
                color: #333;
                margin-bottom: 20px;
            }
    
            .user-info {
                text-align: left;
                margin-top: 20px;
                color: #333;
            }
    
            .footer {
                margin-top: 20px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">Ramu <span class="otp-code">ki</span> Sabji</div>
            <p class="otp-code">Your OTP: <span style="font-weight: bold;">1234</span></p>
            <p class="message">Hello ${username},</p>
            <p class="message">Please use the OTP above to complete your registration with Ramu ki Sabji.</p>
            <div class="user-info">
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
            <p class="footer">If you didn't request this OTP or have any questions, please contact us.</p>
        </div>
    </body>
    </html>
    
    `;
};

module.exports = { OtpMailGenerator };
