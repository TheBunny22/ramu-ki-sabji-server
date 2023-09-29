const mongoose = require("mongoose");
require("dotenv").config();
// Connection URL
const uri = process.env.MONGODB;

// Function to connect to the MongoDB database
async function connect() {
  try {
    // Connect to the MongoDB server
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:process.env.DBNAME,
    });

    console.log("Connected to MongoDB successfully.");

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Function to close the MongoDB connection
async function close() {
  try {
    // Close the connection to the MongoDB server
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

module.exports = { connect, close };
