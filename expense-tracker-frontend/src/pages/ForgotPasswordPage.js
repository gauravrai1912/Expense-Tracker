import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); // Start loading spinner

    try {
      const response = await axios.post('http://localhost:5000/api/users/request-password-reset', { email });
      setMessage(response.data.message);
      setOpenSnackbar(true); // Open success snackbar

      // Redirect to verify OTP page after 2 seconds
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setOpenSnackbar(true); // Open error snackbar
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
          </button>
        </form>
      </div>

      {/* Snackbar for Success and Error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {message ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default ForgotPasswordPage;
