import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const getCategories = (token) => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/category/userCategories', {
      headers: {
        Authorization: `${token}`,
      },
    });

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

// Add Category
export const addCategory = (category, token) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/category/add', category, {
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

// Edit Category
export const editCategory = (id, category, token) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/category/updateCategory/${id}`, category, {
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

// Delete Category
export const deleteCategory = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/category/deleteCategory/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const fetchCategoryIdByName = (categoryName, token) => async (dispatch) => {
  try {
    console.log(categoryName);
    console.log(token)
    const response = await axios.get(
      `http://localhost:5000/api/category/getCategoryByName`,
      {
        params: { name: categoryName }, // Pass query parameters like this
        headers: {
          Authorization: `${token}`, // Include token in headers
        },
      }
    );

    if (response.data && response.data.id) {
    
      return response.data.id; // Return the category ID
    } else {
      console.error('Category not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching category ID by name:', error);
    return null;
  }
};


