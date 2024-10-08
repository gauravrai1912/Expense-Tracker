import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, editBudget } from '../../redux/BudgetActions';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import '../../styles/Budget.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EditBudget = () => {
  const { id } = useParams();  // Get budget ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  const [formData, setFormData] = useState({
    category_name: '',
    monthly_budget: '',
    budget_period: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch budgets from Redux store
  const { budgets, error } = useSelector((state) => state.budget);

  useEffect(() => {
    if (!budgets.length) {
      dispatch(fetchBudgets(token)); // Fetch budgets if not already fetched
    } else {
      const budgetToEdit = budgets.find((budget) => budget.id === parseInt(id, 10));
      if (budgetToEdit) {
        setFormData({
          category_name: budgetToEdit.category ? budgetToEdit.category.name : '',
          monthly_budget: budgetToEdit.monthly_budget,
          budget_period: budgetToEdit.budget_period,
        });
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Budget not found');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/budget'), 1000);
      }
    }
  }, [budgets, dispatch, id, token, navigate]);

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

    // Validate before submitting
    if (!/^\d{4}-\d{2}$/.test(formData.budget_period)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Budget Period must be in yyyy-mm format');
      setSnackbarOpen(true);
      return;
    }

    try {
      await dispatch(editBudget(id, formData, token)); // Dispatch edit action
      setSnackbarSeverity('success');
      setSnackbarMessage('Budget updated successfully');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/budget'), 1000); // Redirect after 1 second
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to update budget');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="budget-container">
      <h1>Edit Budget</h1>
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
          <label>Monthly Budget:</label>
          <input
            type="number"
            name="monthly_budget"
            value={formData.monthly_budget}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Budget Period (yyyy-mm):</label>
          <input
            type="text"
            name="budget_period"
            value={formData.budget_period}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Budget</button>
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

export default EditBudget;
