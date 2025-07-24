NestJS Expense Tracker API Documentation
BaseUrl:  https://expense-tracker-nest-js.vercel.app
GitHub RepoLink: https://github.com/MuhammadKhizar89/Expense-Tracker-Nest-JS
Auth Module 
Cookies will be managed by backend
If you are unauthorize then it will return you
Response:
{
  "success": false,
  "message": " Unauthorized: No token provided or Invalid Token",
}


POST /auth/signup
Register a new user.
Creates a new user and returns a success message.
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
{
  "success": true,
  "message": "User created successfully",
}
POST /auth/signin
Sign in an existing user.
Authenticates the user and sets a JWT token in the cookie.
Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
{
  "success": true,
  "message": "Sign-in successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
Expense Module
POST /expense/create
Create a new expense.
Creates a new expense entry for the authenticated user.
Request Body:
{
  "title": "Groceries",
  "amount": 150,
"description":"New Mobile", //optional
  "date": "2025-07-24T00:00:00.000Z"
}
Response:
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "abc123",
    "title": "Groceries",
    "amount": 150,
     "description":"New Mobile",
    "date": "2025-07-24T00:00:00.000Z"
  }
}
GET /expense/getAll
Retrieve all expenses for the user.
Returns all expenses belonging to the authenticated user.
Response:
{
  "success": true,
  "message": "Expenses retrieved successfully",
  "data": [
    {
      "id": "abc123",
      "title": "Groceries",
      "amount": 150,
      "date": "2025-07-24T00:00:00.000Z"
    },
    ...
  ]
}
DELETE /expense/delete
Delete an expense by ID.
Deletes the specified expense record.
Request Body:
{
  "id": "abc123"
}
Response:
{
  "success": true,
  "message": "Groceries deleted successfully"
}
PATCH /expense/update
Update an expense by ID.
Updates fields of the specified expense. At least one field is required.
Request Body:
{
  "id": "abc123",
  "title": "Updated Title",
  "amount": 200
}
Response:
{
  "success": true,
  "message": "Expense updated successfully",
  "data": {
    "id": "abc123",
    "title": "Updated Title",
    "amount": 200,
    "date": "2025-07-24T00:00:00.000Z"
  }
}
GET /expense/summary
Get expense summary.
Returns a paginated and optionally filtered list of expenses along with summary data.
Query Parameters:
page=1
limit=10
startDate=2025-07-01
endDate=2025-07-24
Response:
{
  "success": true,
  "data": [ ... ],
  "totalCount": 20,
  "totalPages": 2,
  "totalAmount": 2500,
  "currentPage": 1
}

