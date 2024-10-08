import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categoryReducer from './CategoryReducer'; 
import budgetReducer from './BudgetReducer';
import expenseReducer from './ExpenseReduer';

const rootReducer = combineReducers({
  category: categoryReducer,
  budget: budgetReducer,
  expense : expenseReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
