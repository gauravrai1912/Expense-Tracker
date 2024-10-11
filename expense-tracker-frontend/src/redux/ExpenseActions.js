import axios from 'axios';

// Action Types
export const GET_EXPENSES = 'GET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXPENSE_ERROR = 'EXPENSE_ERROR';

// Get Expenses
export const getExpenses = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/expense/getExpenses`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: GET_EXPENSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Add Expense
export const addExpense = (expense, token) => async (dispatch) => {
  try {

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/expense/addExpense`, expense, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: ADD_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Edit Expense
export const editExpense = (id, expense, token) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/expense/updateExpenses/${id}`, expense, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: EDIT_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete Expense
export const deleteExpense = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/expense/deleteExpenses/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: error.response.data.message,
    });
  }
};
