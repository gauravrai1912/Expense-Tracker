const express = require('express');
const router = express.Router();

const  authenticateUser  = require('../middleware/auth');
const { predictExpenses } = require('../controllers/predictController');

router.get('/', authenticateUser, predictExpenses);


module.exports = router;