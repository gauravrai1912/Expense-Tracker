import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { editCategory } from '../../redux/CategoryActions';
import Cookies from 'js-cookie';
import '../../styles/Category.css';

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [categoryName, setCategoryName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const categories = useSelector((state) => state.category.categories);
  
  useEffect(() => {
    // Find the category by ID and set the name for editing
    const category = categories.find((cat) => cat.id === parseInt(id));
    if (category) {
      setCategoryName(category.name);
    } else {
      // Handle case when category is not found (optional)
      setSnackbarSeverity('error');
      setSnackbarMessage('Category not found');
      setSnackbarOpen(true);
      navigate('/categories');
    }
  }, [id, categories, navigate]);

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      await dispatch(editCategory(id, { name: categoryName }, token));
      setSnackbarSeverity('success');
      setSnackbarMessage('Category Updated Successfully');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/categories'), 500); // Redirect after 2 seconds
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating Category');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="edit-category-container">
      <h1>Edit Category</h1>
      <form onSubmit={handleEditCategory}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
        <button type="submit">Update Category</button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditCategory;
