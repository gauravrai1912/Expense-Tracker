import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const getCategories = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/userCategories`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(res.data);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const addCategory = (category, token) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/category/add`, category, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const editCategory = (id, category, token) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/category/updateCategory/${id}`, category, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id, token) => async (dispatch) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/category/deleteCategory/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    // If deletion is successful, dispatch the action
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });

    return Promise.resolve(response.data); // Return success if needed
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete category.';

    // Dispatch error action for Redux
    dispatch({
      type: CATEGORY_ERROR,
      payload: errorMessage,
    });

    return Promise.reject(new Error(errorMessage)); // Return error for component handling
  }
};
export const fetchCategoryIdByName = (categoryName, token) => async (dispatch) => {
  try {
    console.log(categoryName);
    console.log(token)
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/category/getCategoryByName`,
      {
        params: { name: categoryName }, 
        headers: {
          Authorization: `${token}`, 
        },
      }
    );

    if (response.data && response.data.id) {
    
      return response.data.id; 
    } else {
      console.error('Category not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching category ID by name:', error);
    return null;
  }
};


