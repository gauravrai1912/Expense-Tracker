import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, deleteBudget } from '../../redux/BudgetActions';
import Cookies from 'js-cookie';
import '../../styles/Budget.css';

const Budgets = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  // Access budgets and error from the Redux store
  const { budgets, error } = useSelector((state) => state.budget);

  useEffect(() => {
    if (token) {
      dispatch(fetchBudgets(token)); // Dispatch the action to fetch budgets
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
    if (confirmDelete && token) {
      dispatch(deleteBudget(id, token)); // Dispatch the delete action
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="budgets-container">
        <h1>Budgets</h1>
        <Link to="/budget/add" className="add-budget-button">Add Budget</Link>
        {error && <p className="error-message">{error}</p>}
        <table className="budgets-table">
          <thead>
            <tr>
              <th>Budget Period</th>
              <th>Monthly Budget</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {budgets.length > 0 ? (
    budgets.map((budget) => (
      <tr key={budget.id}>
        <td>{budget.budget_period}</td>
        <td>{budget.monthly_budget}</td>
        <td>{budget.category ? budget.category.name : 'N/A'}</td>
        <td>
          <div className="button-container">
            <Link to={`/budget/edit/${budget.id}`} className="edit-button">Edit</Link>
            <button className="delete-button" onClick={() => handleDelete(budget.id)}>Delete</button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No budgets available.</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Budgets;
