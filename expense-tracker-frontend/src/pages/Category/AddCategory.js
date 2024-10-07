import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/CategoryActions';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../styles/Category.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      await dispatch(addCategory({ name: categoryName }, token));
      setSnackbarSeverity('success');
      setSnackbarMessage('Category Added Successfully');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/categories'), 500); // Redirect after 2 seconds
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error adding Category');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="add-category-container">
      <h1>Add Category</h1>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
        <button type="submit">Add Category</button>
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

export default AddCategory;
