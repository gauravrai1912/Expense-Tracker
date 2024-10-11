import React, { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../redux/CategoryActions';
import Cookies from 'js-cookie';
import '../../styles/Category.css';
import { Snackbar, Alert } from '@mui/material'; 

const Categories = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
const [snackbarMessage, setSnackbarMessage] = useState('');
  
  
  const { categories, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (token) {
      dispatch(getCategories(token)); 
    }
  }, [dispatch, token]);


  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    const token = Cookies.get('token'); // Get token from cookies if needed
    
    if (confirmDelete) {
      if (token) {
        dispatch(deleteCategory(id, token))
          .then(() => {
            setSnackbarMessage('Category deleted successfully.');
            setSnackbarOpen(true); // Show success Snackbar
          })
          .catch((error) => {
            setSnackbarMessage('Failed to delete category. Please try again.'); 
            setSnackbarOpen(true); // Show error Snackbar
          });
      }
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar when done
  };
  
  

  return (
    <div className="app-container">
      <Navbar />

      <div className="categories-container">
        <h1>Categories</h1>
        <Link to="/categories/add" className="add-category-button">Add Category</Link>
        {error && <p className="error-message">{error}</p>}
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <div className="button-container">
                    <Link to={`/categories/edit/${category.id}`} className="edit-button">Edit</Link>
                    <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
>
  <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
    {snackbarMessage}
  </Alert>
</Snackbar>

      </div>

      <Footer />
      
    </div>
  );
};

export default Categories;
