import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../styles/VerifyOTPPage.css';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state || {};

  if (!email) {
    return <div>Error: Email not found. Please go back and try again.</div>;
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      console.log(email);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/verify-otp`, { email, otp });
      setMessage(response.data.message);
      setLoading(false);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/reset-password', { state: { email } }); 
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            maxLength="6"
            pattern="[0-9]{6}"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error : message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VerifyOtpPage;
