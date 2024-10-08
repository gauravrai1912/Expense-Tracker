import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, deleteExpense } from '../../redux/ExpenseActions';
import Cookies from 'js-cookie';
import '../../styles/Expense.css';


const Expenses = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  // Access expenses and error from the Redux store
  const { expenses, error } = useSelector((state) => state.expense);

  useEffect(() => {
    if (token) {
      dispatch(getExpenses(token)); // Dispatch the action to fetch expenses
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      if (token) {
        dispatch(deleteExpense(id, token)); // Dispatch the delete action
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="expenses-container">
        <h1>Expenses</h1>
        <Link to="/expenses/add" className="add-expense-button">Add Expense</Link>
        {error && <p className="error-message">{error}</p>}
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th> {/* Display Category Name */}
              <th>Receipt URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category ? expense.category.name : 'Unknown Category'}</td> {/* Display Category Name */}
                <td>
                  <a href={expense.receipt_url} target="_blank" rel="noopener noreferrer">View Receipt</a>
                </td>
                <td>
                  <div className="button-container">
                    <Link to={`/expenses/edit/${expense.id}`} className="edit-button">Edit</Link>
                    <button className="delete-button" onClick={() => handleDelete(expense.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Expenses;
