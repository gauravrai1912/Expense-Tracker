import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../../redux/ExpenseActions';
import { fetchCategoryIdByName } from '../../redux/CategoryActions';
import Cookies from 'js-cookie';
import '../../styles/Expense.css';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [receipt_url, setReceiptUrl] = useState('');
  const [category_name, setCategoryName] = useState(''); // Category name entered by user

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category_name) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const category_id = await dispatch(fetchCategoryIdByName(category_name, token));
      console.log(category_id);
      if (!category_id) {
        alert('Category not found! Please enter a valid category.');
        return;
      }

      const newExpense = {
        amount,
        date,
        description,
        receipt_url,
        category_id, // Use the fetched category_id
      };

      // Dispatch action to add the expense
      dispatch(addExpense(newExpense, token));
      navigate('/expenses'); // Redirect to the expenses page after adding
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="add-expense-container">
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit} className="add-expense-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter expense amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_name">Category Name</label>
          <input
            type="text"
            id="category_name"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="receipt">Receipt URL (optional)</label>
          <input
            type="text"
            id="receipt"
            value={receipt_url}
            onChange={(e) => setReceiptUrl(e.target.value)}
            placeholder="Enter receipt URL"
          />
        </div>

        <button type="submit" className="submit-button">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
