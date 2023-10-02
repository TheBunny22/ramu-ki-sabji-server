function generateOTP() {
  // Define the length of the OTP
  const otpLength = 6;

  // Generate a random OTP consisting of numeric digits
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Ensure the OTP is exactly the desired length by converting it to a string and padding with leading zeros if necessary
  const otpString = otp.toString().padStart(otpLength, "0");

  const otpNum = parseInt(otpString);

  return otpNum;
}

module.exports = generateOTP;
