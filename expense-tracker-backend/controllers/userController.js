const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, OTP } = require('../models');
const { sendOTP } = require('../services/emailService');
const crypto = require('crypto');



exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
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

  
  const otp = crypto.randomInt(100000, 999999).toString();
  
  
  const expirationTime = new Date(Date.now() + 5 * 60000); 

  
  await OTP.create({
    email,
    otp,
    expirationTime,
  });

  
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

    
    if (otpRecord.expirationTime < new Date()) {
      await OTP.destroy({ where: { email, otp } });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    
    await OTP.destroy({ where: { email, otp } }); 
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

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    
    const userId = req.user.id;

    
    const user = await User.findOne({ 
      where: { id: userId }, 
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'] 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



