import React from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../redux/BudgetActions';
import BudgetForm from '../../components/BudgetForm';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddBudget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token'); // Assuming token is stored in cookies

  const handleAddBudget = (budgetData) => {
    dispatch(addBudget(budgetData, token));
    navigate('/budget'); // Navigate back to the budgets list page after successful add
  };

  return (
    <div>
      <h1>Add New Budget</h1>
      <BudgetForm onSubmit={handleAddBudget} token={token} />
    </div>
  );
};

export default AddBudget;
