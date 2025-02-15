# QKart Backend Documentation

## Overview
QKart is an e-commerce backend application built with Node.js, Express, and MongoDB. It provides APIs for user authentication, product management, cart operations, and checkout functionality.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for JWT authentication
- bcrypt for password hashing

## Base URL
```
/verse
```

## Authentication
The application uses JWT (JSON Web Token) based authentication. Protected routes require a Bearer token in the Authorization header.

### Routes

#### 1. Register User
- **Endpoint**: `POST /verse/auth/register`
- **Body**:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
- **Response**: 
```json
{
    "user": {
        "name": "string",
        "email": "string",
        "walletMoney": 500,
        "address": "ADDRESS_NOT_SET"
    },
    "token": {
        "access": {
            "token": "jwt_token",
            "expires": "timestamp"
        }
    }
}
```

#### 2. Login User
- **Endpoint**: `POST /verse/auth/login`
- **Body**:
```json
{
    "email": "string",
    "password": "string"
}
```
- **Response**: Same as register response

## User Management

#### 1. Get User Details
- **Endpoint**: `GET /verse/users/:userId`
- **Authentication**: Required
- **Response**: User object

#### 2. Set Address
- **Endpoint**: `PUT /verse/users/:userId`
- **Authentication**: Required
- **Body**:
```json
{
    "address": "string"
}
```
- **Response**: 
```json
{
    "address": "string"
}
```

## Products

#### 1. Get All Products
- **Endpoint**: `GET /verse/products`
- **Authentication**: Not Required
- **Response**: Array of product objects

#### 2. Get Product by ID
- **Endpoint**: `GET /verse/products/:productId`
- **Authentication**: Not Required
- **Response**: Product object

## Cart Operations

#### 1. Get Cart
- **Endpoint**: `GET /verse/cart`
- **Authentication**: Required
- **Response**: Cart object with items

#### 2. Add Product to Cart
- **Endpoint**: `POST /verse/cart`
- **Authentication**: Required
- **Body**:
```json
{
    "productId": "string",
    "quantity": number
}
```
- **Response**: Updated cart object

#### 3. Update Product in Cart
- **Endpoint**: `PUT /verse/cart`
- **Authentication**: Required
- **Body**:
```json
{
    "productId": "string",
    "quantity": number
}
```
- **Response**: Updated cart object or 204 if product is deleted (quantity = 0)

#### 4. Checkout
- **Endpoint**: `PUT /verse/cart/checkout`
- **Authentication**: Required
- **Response**: 204 on successful checkout

## Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, min length: 8)
- walletMoney (Number, default: 500)
- address (String, default: "ADDRESS_NOT_SET")

### Product Model
- name (String, required)
- category (String, required)
- cost (Number, required)
- rating (Number, required)
- image (String, required)

### Cart Model
- email (String, required)
- cartItems (Array of {product, quantity})
- paymentOption (String)

## Error Handling
The application uses a centralized error handling mechanism that returns consistent error responses in the following format:

```json
{
  "success": false,
  "status": "fail" | "error",
  "message": "Error description"
  // Stack trace included in development environment
}
```

Common HTTP status codes:
- 400 (BAD_REQUEST): Invalid input/parameters
- 401 (UNAUTHORIZED): Authentication failed
- 403 (FORBIDDEN): Authorization failed
- 404 (NOT_FOUND): Resource not found
- 409 (CONFLICT): Resource conflict (e.g., duplicate email)
- 500 (INTERNAL_SERVER_ERROR): Server errors

Example error response:
```json
{
  "success": false,
  "status": "fail",
  "message": "Product already in the cart"
}
```

## Environment Variables
Required environment variables in `.env` file:
- PORT
- MONGODB_URL
- JWT_SECRET
- JWT_ACCESS_EXPIRATION_MINUTES

## Default Configuration
```javascript
DEFAULT_WALLET_MONEY = 500
DEFAULT_ADDRESS = "ADDRESS_NOT_SET"
DEFAULT_PAYMENT_OPTION = "PAYMENT_OPTION_DEFAULT"
```

This documentation covers the main functionality of the QKart backend. For detailed implementation, refer to the specific service and controller files in the codebase.
