import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../../redux/ExpenseActions';
import { getCategories } from '../../redux/CategoryActions'; // Fetch categories action
import Cookies from 'js-cookie';
import '../../styles/Expense.css';
import Navbar from '../../components/Navbar';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [receipt_url, setReceiptUrl] = useState('');
  const [category_id, setCategoryId] = useState(''); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category_id) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const newExpense = {
        amount,
        date,
        description,
        receipt_url,
        category_id, 
      };

      dispatch(addExpense(newExpense, token));
      navigate('/expenses'); 
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className='app-container'>
      <Navbar />
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
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="category-select"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default AddExpense;
