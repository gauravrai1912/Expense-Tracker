const express = require('express');
const { getTotalExpenses, getOverspendingCategories } = require('../controllers/dashboardController');
const  authenticateToken  = require('../middleware/auth'); 

const router = express.Router();


router.get('/total-expenses', authenticateToken, getTotalExpenses);
router.get('/overspending-categories', authenticateToken, getOverspendingCategories);

module.exports = router;
