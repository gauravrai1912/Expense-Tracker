import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBudget } from '../../redux/BudgetActions';
import { fetchCategoryIdByName } from '../../redux/CategoryActions';
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';

const AddBudget = () => {
  const [categoryName, setCategoryName] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [budgetPeriod, setBudgetPeriod] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const budgetPeriodRegex = /^\d{4}-\d{2}$/;

    if (!budgetPeriodRegex.test(budgetPeriod)) {
      setMessage('Budget period must be in the format yyyy-mm.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const categoryId = await dispatch(fetchCategoryIdByName(categoryName, token));
      if (!categoryId) {
        setMessage('Category not found. Please enter a valid category name.');
        setOpenSnackbar(true);
        return;
      }

      const budgetData = {
        category_id: categoryId,
        monthly_budget: monthlyBudget,
        budget_period: budgetPeriod,
      };

      await dispatch(addBudget(budgetData, token));
      setMessage('Budget added successfully!');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/budget'), 1000);
    } catch (error) {
      setMessage('Error adding budget: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="budget-container">
      <h1>Add Budget</h1>
      <form className="budget-form" onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <label>Monthly Budget:</label>
        <input
          type="number"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
          required
        />
        <label>Budget Period (yyyy-mm):</label>
        <input
          type="text"
          value={budgetPeriod}
          onChange={(e) => setBudgetPeriod(e.target.value)}
          required
        />
        <button className="form-submit-button" type="submit">Add Budget</button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </div>
  );
};

export default AddBudget;
