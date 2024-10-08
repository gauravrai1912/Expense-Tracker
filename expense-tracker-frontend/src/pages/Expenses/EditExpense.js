import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, editExpense } from '../../redux/ExpenseActions';
import { fetchCategoryIdByName } from '../../redux/CategoryActions';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import '../../styles/Expense.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EditExpense = () => {
  const { id } = useParams(); // Get expense ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  const [formData, setFormData] = useState({
    category_name: '',
    amount: '',
    date: '',
    description: '',
    receipt_url: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch expenses from Redux store
  const { expenses, error } = useSelector((state) => state.expense);

  useEffect(() => {
    if (!expenses.length) {
      dispatch(getExpenses(token)); // Fetch expenses if not already fetched
    } else {
      const expenseToEdit = expenses.find((expense) => expense.id === parseInt(id, 10));
      if (expenseToEdit) {
        setFormData({
          category_name: expenseToEdit.category ? expenseToEdit.category.name : '',
          amount: expenseToEdit.amount,
          date: expenseToEdit.date.split('T')[0], // Format the date
          description: expenseToEdit.description,
          receipt_url: expenseToEdit.receipt_url,
        });
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Expense not found');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/expenses'), 1000);
      }
    }
  }, [expenses, dispatch, id, token, navigate]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const category_id = await fetchCategoryIdByName(formData.category_name, token); // Get category ID
      if (category_id) {
        await dispatch(editExpense(id, { ...formData, category_id }, token)); // Dispatch edit action
        setSnackbarSeverity('success');
        setSnackbarMessage('Expense updated successfully');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/expenses'), 1000); // Redirect after 1 second
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Category not found');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to update expense');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="add-expense-container">
        <h1>Edit Expense</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category Name:</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Receipt URL:</label>
            <input
              type="url"
              name="receipt_url"
              value={formData.receipt_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Expense</button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </div>
  );
};

export default EditExpense;
