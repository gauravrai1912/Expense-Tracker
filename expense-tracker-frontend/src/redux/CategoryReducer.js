import {GET_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, CATEGORY_ERROR} from './CategoryActions';

const initialState = {
    categories: [],
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
          error: null,
        };
      case ADD_CATEGORY:
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      case EDIT_CATEGORY:
        return {
          ...state,
          categories: state.categories.map((category) =>
            category.id === action.payload.id ? action.payload : category
          ),
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          categories: state.categories.filter((category) => category.id !== action.payload),
        };
      case CATEGORY_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;