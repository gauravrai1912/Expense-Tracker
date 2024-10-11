# Expense Tracker Application

This application helps users manage and track their personal expenses, providing features such as user authentication, category management, budgeting, and expense tracking, with insightful visualizations through a dashboard.

## Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Token).
- **Password Reset with OTP**: Users can reset their password through a secure OTP-based process.
- **Category Management**: Users can create, edit, and manage categories to classify their expenses.
- **Monthly Budgeting**: Users can set monthly budgets for each category to keep track of spending limits.
- **Expense Tracking**: Users can log expenses by specifying the category, amount, description, and upload receipts.
- **Dashboard Insights**:
  - Total monthly expenses.
  - Budget vs actual spending comparisons.
  - Spending trends displayed in bar charts and pie charts for easy analysis.

## Technologies Used

### Frontend:
- **React.js**: For building the interactive user interface.
- **Redux**: State management for categories, budgets, and expenses.
- **Material-UI (MUI)**: Provides pre-built, customizable UI components.

### Backend:
- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web framework used to create RESTful APIs.
- **Sequelize**: ORM for interacting with PostgreSQL database.
- **JWT**: For user authentication and authorization.
- **Nodemailer**: Used to send OTP emails for password recovery.

### Database:
- **PostgreSQL**: Relational database for storing user data, categories, budgets, and expenses.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git

2. Navigate into the project directory:
   ```bash
   cd expense-tracker

3. Install backend dependencies:
    ```bash
    cd expense-tracker-backend
    npm install

4. Install frontend dependencies:
    ```bash
    cd expense-tracker-frontend
    npm install

5. Set up environment variables for the backend. Create a .env file in the backend directory and add the following:
    ```bash
    PORT=5000
    DB_NAME=your_db_name
    DB_USER=db_user
    DB_PASSWORD=db_user_password
    JWT_SECRET=your_jwt_secret_key
    DATABASE_URL=your_postgresql_database_url
    OTP_EMAIL=your_email_address_for_sending_otps
    OTP_PASSWORD=your_email_password

6. Set up environment variables for the frontend. Create a .env file in the frontend directory and add the following:
    ```bash
    REACT_APP_API_BASE_URL=http://localhost:5000/api

6. Run the backend server:
    ```bash
    cd backend
    npm start

7. Run the frontend application:
    ```bash
    cd frontend
    npm start

8. Open your browser and go to http://localhost:3000 to view the application.

## Usage

- **Sign Up / Log In**: Users must sign up or log in to access the application. JWT tokens are used for secure session management.
- **Password Reset**: Users can reset their password using a one-time password (OTP) sent to their email.
- **Add Categories**: Users can create categories for organizing their expenses and assign a monthly budget to each category.
- **Add Expenses**: Users can log expenses, associating them with a category, and track the amount, description, and upload receipts.
- **View Dashboard**: Users can view their total expenses for the current month, track their spending against the budget, and analyze trends using bar graphs and pie charts.

## API Endpoints

### Authentication
- `POST /api/user/signup`: Register a new user.
- `POST /api/user/login`: Log in and receive a JWT token.
- `POST /api/user/forgot-password`: Request an OTP to reset the password.
- `POST /api/user/reset-password`: Reset the password using the OTP.

### Categories
- `GET /api/userCategories`: Retrieve all categories for the logged-in user.
- `POST /api/category/add`: Create a new category.
- `PUT /api/category/updateCategory/:id'` : Update a particular category.
- `DELETE /api/category/deleteCategory/:id` : Delete a category.

### Budget
- `GET /api/budget/userBudgets`: Retrieve all budgets for the logged-in user.
- `POST /api/budget/addBudget`: Create a monthly budget for a specific category.
- `PUT /api/budget/updateBudget/:id'` : Update a particular budget.
- `DELETE /api/budget/deleteBudget/:id` : Delete a budget.

### Expenses
- `GET /api/expense/getExpense`: Retrieve all expenses for the logged-in user.
- `POST /api/expense/addExpense`: Add a new expense.
- `PUT /api/expense/updateExpense/:id'` : Update a particular expense.
- `DELETE /api/expense/deleteExpense/:id` : Delete an expense.

### Dashboard
- `GET /api/dashboard`: Retrieve total expenses, budget comparison, and spending trends.





