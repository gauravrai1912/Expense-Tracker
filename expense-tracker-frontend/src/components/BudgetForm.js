import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryIdByName } from '../redux/CategoryActions'; // Assuming this action fetches category ID by name

const BudgetForm = ({ onSubmit, initialData = {}, token }) => {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState(initialData.categoryName || '');
  const [monthlyBudget, setMonthlyBudget] = useState(initialData.monthlyBudget || '');
  const [budgetPeriod, setBudgetPeriod] = useState(initialData.budgetPeriod || '');
  const [categoryId, setCategoryId] = useState(initialData.categoryId || '');
  const [loading, setLoading] = useState(false); // To handle loading state

  // Fetch category ID based on category name
  const handleFetchCategoryId = async () => {
    if (!categoryId && categoryName) {
      try {
        const fetchedId = await dispatch(fetchCategoryIdByName(categoryName, token));
        if (fetchedId) {
          setCategoryId(fetchedId);
        } else {
          alert('Category not found. Please create it first.');
          return null; // Stop further processing
        }
      } catch (error) {
        console.error('Error fetching category ID:', error);
        alert('An error occurred while fetching category.');
        return null;
      }
    }
    return categoryId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fetchedCategoryId = await handleFetchCategoryId();
    
    if (!fetchedCategoryId) {
      setLoading(false);
      return; // Stop submission if category ID is not fetched
    }

    const budgetData = {
      category_id: fetchedCategoryId,
      monthly_budget: monthlyBudget,
      budget_period: budgetPeriod,
    };
    console.log(budgetData);
    onSubmit(budgetData); // Pass the form data to the parent component
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="monthlyBudget">Monthly Budget</label>
        <input
          type="number"
          id="monthlyBudget"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="budgetPeriod">Budget Period (YYYY-MM)</label>
        <input
          type="text"
          id="budgetPeriod"
          value={budgetPeriod}
          onChange={(e) => setBudgetPeriod(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="form-submit-button" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BudgetForm;
