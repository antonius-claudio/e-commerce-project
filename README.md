# e-commerce
E-Commerce
---

### Demo

https://e-commerce-8a1e7.web.app/

## POST /register
> Register new user

**Request Header**
```
no needed
```

**Request Body**
```
{
    "email": "<email user>",
    "password": "<password user>",
    "name": "<name user>",
    "address": "<address user>",
    "phone": "<phone user>"
}
```

**Response (201 - Ok)**
```
{
  "access_token": "<access token user>",
  "email": <email user>,
  "name": <name user>,
  "address": "<address user>",
  "phone": "<phone user>"
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "Email is required!",
    "Must email format!",
    "Password is required!",
    "Name is required!",
    "Address is required!",
    "Phone is required!"
  ]
}
```

**Response (401 - Unauthorized)~Same Email**
```
{
  "message": [
    "Email already used!"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Save to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## POST /login
> login as user

**Request Header**
```
no needed
```

**Request Body**
```
{
    "email": "<email user>",
    "password": "<password user>"
}
```

**Response (200 - Ok)**
```
{
  "access_token": "<access token user>",
  "email": <email user>,
  "name": <name user>,
  "address": "<address user>",
  "phone": "<phone user>"
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "Email is required!",
    "password is required!"
  ]
}
```

**Response (404 - Not Found)~Wrong Email**
```
{
  "message": [
    "Email not found!"
  ]
}
```

**Response (401 - Unauthorized)~Wrong Password**
```
{
  "message": [
    "Password invalid!"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Save to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## GET /products
> User or Guest can get list products

**Request Header**
```
{
   no needed
}
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**
```
{
    "id": <id product>,
    "name": "<name product>",
    "image_url": "<url product>",
    "price": <price product>,
    "stock": <stock product>,
    "createdAt": "2020-04-15T16:01:50.807Z",
    "updatedAt": "2020-04-15T16:23:17.010Z"
},{},...
```

**Response (500 - Internal Server Error)~Failed Read to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## PUT /products
> User update stock product

**Request Header**
```
{
    access_token: <access token user>
}
```

**Request Body**
```
{
  "stock": "<stock product>"
}
```

**Request Params**
```
/:id
```

**Response (200 - Ok)**~updated
```
{
  "id": <id product>,
  "name": "<name product>",
  "image_url": "<image_url product>",
  "price": <price product>,
  "stock": <stock product>,
  "updatedAt": "2020-04-15T17:38:25.406Z",
  "createdAt": "2020-04-15T17:38:25.406Z"
}
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## GET /carts
> Only user can get carts

**Request Header**
```
{
    access_token: <access token user>
}
```

**Response (200 - Ok)**
```
{
    "id": <id cart>,
    "ProductId": <product id>,
    "CustomerId": <customer id>,
    "quantity": <quantity>,
    "createdAt": "2020-04-22T18:45:13.145Z",
    "updatedAt": "2020-04-22T18:46:54.210Z",
    "Product": {
      "id": <product id>,
      "name": "<product name>",
      "image_url": "<product url>",
      "price": <product price>,
      "stock": <product stock>,
      "createdAt": "2020-04-15T16:32:35.719Z",
      "updatedAt": "2020-04-22T17:20:43.652Z"
    }
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## POST /carts
> User add item to cart

**Request Header**
```
{
    access_token: <access token user>
}
```

**Request Body**
```
{
    ProductId: <product id>,
    quantity: <quantity>
}
```

**Response (200 - Ok)**~
```
{
  "id": <cart id>,
  "ProductId": <product id>,
  "CustomerId": <customer id>,
  "quantity": <quantity>,
  "createdAt": "2020-04-22T09:50:29.409Z",
  "updatedAt": "2020-04-22T09:54:47.786Z",
  "Product": {
    "id": <product id>,
    "name": "<product name>",
    "image_url": "<product url>",
    "price": <product price>,
    "stock": <product stock>,
    "createdAt": "2020-04-15T16:48:47.668Z",
    "updatedAt": "2020-04-15T16:48:47.668Z"
  }
}
```

**Response (404 - Not Found)**~id product not found
```
{
  "message": [
    "Product not found!"
  ]
}
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## PUT /carts
> User update quantity item to cart

**Request Header**
```
{
    access_token: <access token user>
}
```

**Request Body**
```
{
    id: <product id>,
    quantity: <quantity>
}
```

**Response (200 - Ok)**~
```
{
  "id": <cart id>,
  "ProductId": <product id>,
  "CustomerId": <customer id>,
  "quantity": <quantity>,
  "createdAt": "2020-04-21T17:03:46.530Z",
  "updatedAt": "2020-04-21T18:07:17.437Z"
}
```

**Response (404 - Not Found)**~id product not found
```
{
  "message": [
    "Product not found!"
  ]
}
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## DELETE /carts
> User delete all own cart

**Request Header**
```
{
    access_token: <access token user>
}
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**~
```
{
  "message": "Successfully delete"
}
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## GET /transactions
> User get all own transaction

**Request Header**
```
{
    access_token: <access token user>
}
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**~
```
[
  {
    "id": <checkout id>,
    "date": "<checkout date>",
    "CustomerId": <customer id>,
    "total": <checkout total>,
    "createdAt": "2020-04-22T19:03:17.209Z",
    "updatedAt": "2020-04-22T19:03:17.209Z",
    "Customer": {
      "id": <customer id>,
      "email": "<customer email>",
      "name": "<customer name>",
      "address": "<customer address>",
      "phone": "<customer phone>",
      "status": "<customer status>",
      "createdAt": "2020-04-22T05:26:24.470Z",
      "updatedAt": "2020-04-22T05:26:24.470Z"
    }
  }
]
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## GET /transactions/:id
> User get all own product in transaction

**Request Header**
```
{
    access_token: <access token user>
}
```
**Request Params**
```
{
    id: <id transaction>
}
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**~
```
[
  {
    "id": <id CheckoutProduct>,
    "CheckoutId": <Checkout Id>,
    "name": "<name product>",
    "price": <price product>,
    "quantity": <CheckoutProduct quantity>,
    "createdAt": "2020-04-22T19:03:17.271Z",
    "updatedAt": "2020-04-22T19:03:17.271Z"
  }
]
```

**Response (401 - Not Authorized)**~ don't have access token
```
{
  "message": [
    "Don't have access"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Write to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---
