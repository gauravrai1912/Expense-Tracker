import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import categoryReducer from './CategoryReducer'; 
import budgetReducer from './BudgetReducer';
import expenseReducer from './ExpenseReduer';

const rootReducer = combineReducers({
  category: categoryReducer,
  budget: budgetReducer,
  expense : expenseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
