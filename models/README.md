# Data Definition

## User
- **username** (Object)
  - `f_name` (String, Required): The first name of the user.
  - `l_name` (String, Required): The last name of the user.
- `email` (String, Required): The user's email address. It must match a valid email pattern.
- `password` (String, Required): The user's password.
- `mobile` (Number, Required): The user's mobile number.
- `otp` (Number, Optional): One-time password for the user.
- `address` (Array of Objects): User's addresses.
  - `add_name` (String, Optional, Default: "home", Max Length: 10): Name of the address.
  - `street` (String, Optional, Default: ""): Street of the address.
  - `landmark` (String, Optional, Default: ""): Landmark of the address.
  - `city` (String, Optional, Default: "Himmatnagar"): City of the address.
  - `zipcode` (Number, Optional, Default: 383001): Zipcode of the address.
  - `state` (String, Optional, Default: "Gujarat , In"): State of the address.
- `cart` (Array of Objects): User's shopping cart.
  - `cart_id` (ObjectId, Required): Reference to an item in the cart.
  - `quantity` (Number, Required): Quantity of the item in the cart.

# Entity Relations Description

- Each **User** has a unique identifier.
- Users have a **username**, which consists of a **first name** and a **last name**.
- Users must provide a valid **email** address, which is used for identification.
- Users have a **password** for authentication.
- Users are associated with a **mobile** number.
- Users may have an optional **otp** (one-time password) for authentication purposes.
- Users can have multiple **addresses** stored as an array of objects. Each address has various properties like name, street, city, etc.
- Users can create a **cart** for shopping, where each item in the cart is represented as an object with a reference to the item's ObjectId and a quantity.

| Field          | Type                          | Required | Default                  | Validation/Comments                                 |
|----------------|-------------------------------|----------|--------------------------|----------------------------------------------------|
| username       | Object                        | -        | -                        | -                                                  |
| - f_name       | String                        | Yes      | -                        | -                                                  |
| - l_name       | String                        | Yes      | -                        | -                                                  |
| email          | String                        | Yes      | -                        | Must match the email pattern (regex validation)   |
| password       | String                        | Yes      | -                        | -                                                  |
| mobile         | Number                        | Yes      | -                        | -                                                  |
| otp            | Number                        | No       | -                        | -                                                  |
| address        | Array of Objects              | -        | -                        | -                                                  |
| - add_name     | String                        | No       | "home"                   | Max length: 10 characters                           |
| - street       | String                        | No       | ""                       | -                                                  |
| - landmark     | String                        | No       | ""                       | -                                                  |
| - city         | String                        | No       | "Himmatnagar"            | -                                                  |
| - zipcode      | Number                        | No       | 383001                   | -                                                  |
| - state        | String                        | No       | "Gujarat , In"           | -                                                  |
| cart           | Array of Objects (References)  | -        | -                        | -                                                  |
| - cart_id      | ObjectId (Reference)          | Yes      | -                        | Must reference a valid ObjectId for items          |
| - quantity     | Number                        | Yes      | -                        | -                                                  |
