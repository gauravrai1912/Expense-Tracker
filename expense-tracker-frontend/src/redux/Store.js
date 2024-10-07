import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categoryReducer from './CategoryReducer'; 
import budgetReducer from './BudgetReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  budget: budgetReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
