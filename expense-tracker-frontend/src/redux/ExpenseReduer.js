import {
    GET_EXPENSES,
    ADD_EXPENSE,
    EDIT_EXPENSE,
    DELETE_EXPENSE,
    EXPENSE_ERROR,
  } from './ExpenseActions';
  
  const initialState = {
    expenses: [],
    error: null,
  };
  
  const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EXPENSES:
        return {
          ...state,
          expenses: action.payload,
          error: null,
        };
      case ADD_EXPENSE:
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
        };
      case EDIT_EXPENSE:
        return {
          ...state,
          expenses: state.expenses.map((expense) =>
            expense.id === action.payload.id ? action.payload : expense
          ),
        };
      case DELETE_EXPENSE:
        return {
          ...state,
          expenses: state.expenses.filter((expense) => expense.id !== action.payload),
        };
      case EXPENSE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default expenseReducer;
  