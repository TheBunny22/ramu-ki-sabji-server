# UpdateProfile Controller

The `UpdateProfile` controller handles various user profile-related operations, including resetting the password, adding an address, and removing an address.

## Endpoints

### 1. Reset Password

- **Route**: `/user/update-profile`
- **Method**: `POST`
- **Description**: Reset the user's password.
- **Request Body**:
  ```json
  {
    "updateType": "reset_password",
    "data": {
      "newPassword": "newpassword123"
    }
  }
  ```
- **Response**:
  - Status Code: 200 OK
  - Response Body:
    ```json
    {
      "msg": "Update of reset_password is done",
      "update": true
    }
    ```
- **Example**:
  ```shell
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{
    "updateType": "reset_password",
    "data": {
      "newPassword": "newpassword123"
    }
  }' http://localhost:3000/user/update-profile
  ```

### 2. Add Address

- **Route**: `/user/update-profile`
- **Method**: `POST`
- **Description**: Add a new address to the user's profile.
- **Request Body**:
  ```json
  {
    "updateType": "add_address",
    "data": {
      "add_name": "Home",
      "street": "123 Main St",
      "landmark": "Near Park"
    }
  }
  ```
- **Response**:
  - Status Code: 200 OK
  - Response Body:
    ```json
    {
      "msg": "Update of add_address is done",
      "update": {
        // Updated user profile with the new address
      }
    }
    ```
- **Example**:
  ```shell
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{
    "updateType": "add_address",
    "data": {
      "add_name": "Home",
      "street": "123 Main St",
      "landmark": "Near Park"
    }
  }' http://localhost:3000/user/update-profile
  ```

### 3. Remove Address

- **Route**: `/user/update-profile`
- **Method**: `POST`
- **Description**: Remove an address from the user's profile.
- **Request Body**:
  ```json
  {
    "updateType": "remove_address",
    "data": {
      "add_name": "Home"
    }
  }
  ```
- **Response**:
  - Status Code: 200 OK
  - Response Body:
    ```json
    {
      "msg": "Update of remove_address is done",
      "update": {
        // Updated user profile after removing the address
      }
    }
    ```
- **Example**:
  ```shell
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{
    "updateType": "remove_address",
    "data": {
      "add_name": "Home"
    }
  }' http://localhost:3000/user/update-profile
  ```

## Error Handling

- The controller handles various error scenarios, including missing parameters and database errors, and returns appropriate error responses.

## Usage

- To use these endpoints, make HTTP POST requests to the respective routes as shown in the examples above.

- Ensure that you include the `Authorization` header with a valid access token for authenticated requests.
