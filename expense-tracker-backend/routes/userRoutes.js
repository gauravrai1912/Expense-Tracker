const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const { requestPasswordReset, resetPassword , verifyOTP , getCurrentUser } = require('../controllers/userController'); 
const  authenticateUser  = require('../middleware/auth');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp',verifyOTP);
router.post('/request-password-reset', requestPasswordReset); 
router.post('/reset-password', resetPassword); 
router.get('/details', authenticateUser, getCurrentUser);

module.exports = router;
