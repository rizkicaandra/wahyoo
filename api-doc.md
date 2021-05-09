# Wahyoo TEST
  
List of available endpoints:
- `POST /signup`
- `POST /login`
- `GET /account`
- `GET /transactions`
- `POST /transactions/deposit`
- `POST /transactions/withdraw`

### POST /signup

Register to system and create account 

Request:

- data:

```json
{
  "email": "string",
  "password": "string",
}
```

- headers:

```json
no needed
```

Response:
- status 201

```json
{
    "id": "number",
    "email": "string",
    "balance": "number"
}
```

Error Response:
- 400 bad request
- 500 internal server error

### POST /login

Sign in to sistem

Request:

- data:

```json
{
  "username": "string",
  "password": "string",
}
```

- headers:

```json
no needed
```

Response:
- status 200

```json
{
    "access_token": "string"
}
```

Error Response:
- 400 bad request
- 500 internal server error

### GET /account

Get current balance

- data:

```json
no needed
```

- headers:

```json
{
  "access_token":"string"
}
```

Response:
- status 200

```json
{
    "balance": "number"
}
```

Error Response:
- 401 anauthorized
- 500 internal server error

### GET /transactions

Get all transaction data search by clientId and accountId

- data:

```json
{
  "amount": "number"
}
```

- headers:

```json
{
  "access_token":"string"
}
```

Response:
- status 200

```json
{
    "transactionData": [
        {
            "category": "Deposit",
            "amount": "number",
            "balanceHistory": "number",
            "ClientId": "number",
            "AccountId": "number",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

Error Response:
- 401 anauthorized
- 400 bad request
- 500 internal server error

### POST /transactions/deposit

deposit client money

- data:

```json
{
  "amount": "number"
}
```

- headers:

```json
{
  "access_token":"string"
}
```

Response:
- status 201

```json
{
    "message": "Deposit success",
    "Balance": "number"
}
```

Error Response:
- 401 anauthorized
- 400 bad request
- 500 internal server error

### POST /transactions/withdraw

withdraw money

- data:

```json
{
  "amount": "number"
}
```
- headers:
```json
{
  "access_token":"string"
}
```
Response:
- status 201

```json
{
    "message": "Withdraw success",
    "Balance": "number"
}
```

Error Response:
- 401 anauthorized
- 400 bad request
- 500 internal server error


### ERROR RESPONSE DETAIL

- 401 UNAUTHORIZED 

```json
{
    "message": "Not Authorized"
}
```

- 404 Bad Request / Validation Error

```json
{
    "message": "Data not found"
}
```

- 400 Bad Request / Validation Error

```json
{
    "message": "Required field must be filled"
}
```

- 500 Internal Server Error

```json
{ 
    "error": "Internal Server Error"
}
```