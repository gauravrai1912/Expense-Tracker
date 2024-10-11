import axios from 'axios';

export const GET_BUDGETS = 'GET_BUDGETS';
export const ADD_BUDGET = 'ADD_BUDGET';
export const EDIT_BUDGET = 'EDIT_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const BUDGET_ERROR = 'BUDGET_ERROR';

export const fetchBudgets = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/budget/userBudgets`, {
      headers: {
        Authorization: `${token}`, 
      },
    });
    console.log(response.data);
    dispatch({ 
        type: GET_BUDGETS,
        payload: response.data 
    }); 
  } catch (error) {
    console.error("Error fetching budgets:", error);
    dispatch({ type: BUDGET_ERROR, payload: error.response.data.message });
  }
};

export const addBudget = (budget, token) => async (dispatch) => {
  try {
    console.log(budget);
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/budget/addBudget`, budget, {
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

export const editBudget = (id, budget, token) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/budget/updateBudget/${id}`, budget, {
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

export const deleteBudget = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/budget/deleteBudget/${id}`, {
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
