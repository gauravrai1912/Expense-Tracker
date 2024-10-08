
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Categories from './pages/Category/Category';
import AddCategory from './pages/Category/AddCategory';
import EditCategory from './pages/Category/EditCategory';
import Budgets from './pages/Budget/Budget';
import AddBudget from './pages/Budget/AddBudget';
import EditBudget from './pages/Budget/EditBudget';
import Expenses from './pages/Expenses/Expense';
import AddExpense from './pages/Expenses/AddExpense';
import EditExpense from './pages/Expenses/EditExpense';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />
        <Route path="/budget" element={<Budgets />} />
        <Route path="/budget/add" element={<AddBudget />} />
        <Route path="/budget/edit/:id" element={<EditBudget />} /> 
        <Route path="/expenses" element={<Expenses />} /> 
        <Route path="/expenses/add" element={<AddExpense />} />
        <Route path="/expenses/edit/:id" element={<EditExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
