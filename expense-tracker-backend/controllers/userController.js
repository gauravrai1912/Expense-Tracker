const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, OTP } = require('../models');
const { sendOTP } = require('../services/emailService');
const crypto = require('crypto');


// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  
  // Store OTP with expiration (5 minutes from now)
  const expirationTime = new Date(Date.now() + 5 * 60000); // 5 minutes in milliseconds

  // Save OTP in the database
  await OTP.create({
    email,
    otp,
    expirationTime,
  });

  // Send OTP to user's email
  await sendOTP(email, otp);

  res.status(200).json({ message: 'OTP sent to your email' });
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ where: { email, otp } });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired
    if (otpRecord.expirationTime < new Date()) {
      await OTP.destroy({ where: { email, otp } });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid
    await OTP.destroy({ where: { email, otp } }); // Delete OTP record after verification
    res.status(200).json({ message: 'OTP is valid' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get details of the current logged-in user
exports.getCurrentUser = async (req, res) => {
  try {
    // Extract the user ID from the decoded token (available in req.user)
    const userId = req.user.id;

    // Fetch the user details from the database using the ID
    const user = await User.findOne({ 
      where: { id: userId }, 
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'] // Only fetch required fields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



