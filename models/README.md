# Data Definition

## User
- **username** (Object)
  - `f_name` (String, Required): The first name of the user.
  - `l_name` (String, Required): The last name of the user.
- **email** (String, Required): The user's email address. It must match a valid email pattern.
- **password** (String, Required): The user's password.
- **mobile** (Number, Required): The user's mobile number.
- **address** (Array of Objects): User's addresses.
  - `add_name` (String, Optional, Default: "home", Max Length: 10): Name of the address.
  - `street` (String, Optional, Default: ""): Street of the address.
  - `landmark` (String, Optional, Default: ""): Landmark of the address.
  - `city` (String, Optional, Default: "Himmatnagar"): City of the address.
  - `zipcode` (Number, Optional, Default: 383001): Zipcode of the address.
  - `state` (String, Optional, Default: "Gujarat , In"): State of the address.
- **cart** (Array of Objects): User's shopping cart.
  - `cart_id` (ObjectId, Required): Reference to an item in the cart.
  - `quantity` (Number, Required): Quantity of the item in the cart.

# Entity Relations Description

- Each **User** has a unique identifier.
- Users have a **username**, which consists of a **first name** and a **last name**.
- Users must provide a valid **email** address, which is used for identification.
- Users have a **password** for authentication.
- Users are associated with a **mobile** number.
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


## User Static Methods Documentation

### `NewUser(f_name, l_name, email, password, mobile)`

Create a new user and add it to the database.

**Parameters:**
- `f_name` (String, Required): The first name of the user.
- `l_name` (String, Required): The last name of the user.
- `email` (String, Required): The user's email address.
- `password` (String, Required): The user's password.
- `mobile` (Number, Required): The user's mobile number.

**Usage:**

```javascript
try {
  const user = await User.NewUser("John", "Doe", "johndoe@example.com", "password123", 1234567890);
  console.log("User created:", user);
} catch (error) {
  console.error(error.message);
}
```

---

### `signIn(email, password)`

Authenticate a user by checking their email and password.

**Parameters:**
- `email` (String, Required): The user's email address.
- `password` (String, Required): The user's password.

**Returns:** The user object if authentication is successful, otherwise null.

**Usage:**

```javascript
try {
  const user = await User.signIn("johndoe@example.com", "password123");
  if (user) {
    console.log("User authenticated:", user);
  } else {
    console.log("Authentication failed.");
  }
} catch (error) {
  console.error(error.message);
}
```

---

### `getCart(_id)`

Retrieve the shopping cart items for a user.

**Parameters:**
- `_id` (ObjectId, Required): The unique identifier of the user.

**Returns:** An array of objects representing items in the user's shopping cart.

**Usage:**

```javascript
try {
  const cartItems = await User.getCart("userObjectId");
  console.log("User's shopping cart:", cartItems);
} catch (error) {
  console.error(error.message);
}
```

---

### `addAddress(userId, address)`

Add a new address to a user's profile.

**Parameters:**
- `userId` (ObjectId, Required): The unique identifier of the user.
- `address` (Object, Required): An object representing the address to be added.

**Returns:** The updated user object with the new address added.

**Usage:**

```javascript
try {
  const address = {
    add_name: "Work",
    street: "123 Main St",
    city: "Cityville",
    zipcode: 12345,
    state: "California, USA"
  };
  const updatedUser = await User.addAddress("userObjectId", address);
  console.log("User with new address:", updatedUser);
} catch (error) {
  console.error(error.message);
}
```

---

### `removeAddress(userId, addName)`

Remove an address from a user's profile by its name.

**Parameters:**
- `userId` (ObjectId, Required): The unique identifier of the user.
- `addName` (String, Required): The name of the address to be removed.

**Returns:** The updated user object with the specified address removed.

**Usage:**

```javascript
try {
  const updatedUser = await User.removeAddress("userObjectId", "Work");
  console.log("User with address removed:", updatedUser);
} catch (error) {
  console.error(error.message);
}
```

---

### `addItemToCart(userId, item)`

Add an item to the user's shopping cart.

**Parameters:**
- `userId` (ObjectId, Required): The unique identifier of the user.
- `item` (Object, Required): An object representing the item to be added to the cart, including `cart_id` (ObjectId) and `quantity` (Number).

**Returns:** The updated user object with the new item added to the cart.

**Usage:**

```javascript
try {
  const item = {
    cart_id: "itemObjectId",
    quantity: 2
  };
  const updatedUser = await User.addItemToCart("userObjectId", item);
  console.log("User with item added to cart:", updatedUser);
} catch (error) {
  console.error(error.message);
}
```

---

### `removeItemFromCart(userId, cartId)`

Remove an item from the user's shopping cart by its `cart_id`.

**Parameters:**
- `userId` (ObjectId, Required): The unique identifier of the user.
- `cartId` (ObjectId, Required): The unique identifier of the item to be removed from the cart.

**Returns:** The updated user object with the specified item removed from the cart.

**Usage:**

```javascript
try {
  const updatedUser = await User.removeItemFromCart("userObjectId", "itemObjectId");
  console.log("User with item removed from cart:", updatedUser);
} catch (error) {
  console.error(error.message);
}
```

---

### `emptyCart(_id)`

Empty the user's shopping cart.

**Parameters:**
- `_id` (ObjectId, Required): The unique identifier of the user.

**Returns:** The updated user object with an empty shopping cart.

**Usage:**

```javascript
try {
  const updatedUser = await User.emptyCart("userObjectId");
  console.log("User with an empty cart:", updatedUser);
} catch (error) {
  console.error(error.message);
}
```
