# Online Food Ordering System Server

This Node.js server powers the backend of an Online Food Ordering System. It provides the necessary APIs for user registration, authentication, food ordering, and more.

## Features

- User Registration and Authentication
- Restaurant Management
- Menu Management
- Order Processing
- Address Management
- User Profile Management
- Payment Integration

## Prerequisites

Before running the server, make sure you have the following dependencies installed:

- Node.js and npm (Node Package Manager)
- MongoDB (for database storage)
- Other necessary libraries (installed via npm)

## Getting Started

Follow these steps to get the server up and running:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/yourusername/online-food-ordering-server.git
   cd online-food-ordering-server
   ```

2. Install the required npm packages:

   ```shell
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and configure the following environment variables:

   ```plaintext
   PORT=3000             # Port on which the server will run
   MONGODB_URI=mongodb://localhost/food_ordering  # MongoDB connection URI
   SECRET_KEY=yoursecretkey      # Secret key for JWT token generation
   ```

4. Start the server:

   ```shell
   npm start
   ```

The server should now be running on the specified port, and you can start making API requests.

## API Documentation

- Detailed API documentation can be found in the [API Documentation](api-doc.md) file. This document explains the available endpoints, request parameters, response format, and examples of API calls.

## Usage

- To use the Online Food Ordering System server, you can integrate it with your frontend application or test the APIs using tools like Postman.

## Contributing

If you'd like to contribute to this project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## Acknowledgments

- Special thanks to [Harihar Updhyay] for their contributions to this project.

## Contact

For any questions or issues, please contact [Bunny Upadhyay] at [kingkiller22122002@gmail.com].
```
