import axios from 'axios';

export const GET_BUDGETS = 'GET_BUDGETS';
export const ADD_BUDGET = 'ADD_BUDGET';
export const EDIT_BUDGET = 'EDIT_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const BUDGET_ERROR = 'BUDGET_ERROR';

// Get Budgets
export const fetchBudgets = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/budget/userBudgets', {
      headers: {
        Authorization: `${token}`, // Add the token here
      },
    });
    dispatch({ 
        type: GET_BUDGETS,
        payload: response.data 
    }); // Changed to GET_BUDGETS
  } catch (error) {
    console.error("Error fetching budgets:", error);
    dispatch({ type: BUDGET_ERROR, payload: error.response.data.message });
  }
};

// Add Budget
export const addBudget = (budget, token) => async (dispatch) => {
  try {
    console.log(budget);
    const res = await axios.post('http://localhost:5000/api/budget/addBudget', budget, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: ADD_BUDGET,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Edit Budget
export const editBudget = (id, budget, token) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/budget/edit/${id}`, budget, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: EDIT_BUDGET,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete Budget
export const deleteBudget = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/budget/deleteBudget/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: DELETE_BUDGET,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_ERROR,
      payload: error.response.data.message,
    });
  }
};
