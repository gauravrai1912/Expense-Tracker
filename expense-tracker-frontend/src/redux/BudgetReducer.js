import {
    GET_BUDGETS,
    ADD_BUDGET,
    EDIT_BUDGET,
    DELETE_BUDGET,
    BUDGET_ERROR,
  } from './BudgetActions';
  
  const initialState = {
    budgets: [],
    error: null,
  };
  
  const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BUDGETS:
        return {
          ...state,
          budgets: action.payload,
          error: null,
        };
      case ADD_BUDGET:
        return {
          ...state,
          budgets: [...state.budgets, action.payload],
        };
      case EDIT_BUDGET:
        return {
          ...state,
          budgets: state.budgets.map((budget) =>
            budget.id === action.payload.id ? action.payload : budget
          ),
        };
      case DELETE_BUDGET:
        return {
          ...state,
          budgets: state.budgets.filter((budget) => budget.id !== action.payload),
        };
      case BUDGET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default budgetReducer;
  