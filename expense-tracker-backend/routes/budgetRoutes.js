const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const  authenticateUser  = require('../middleware/auth');


// Route to create a new budget for a category
router.post('/addBudget',authenticateUser, budgetController.createBudget);

// Route to get all budgets for a user
router.get('/userBudgets',authenticateUser, budgetController.getBudgetsByUser);

// Route to update a budget by ID
router.put('/updateBudget/:id',authenticateUser,budgetController.updateBudget);

// Route to delete a budget by ID
router.delete('/deleteBudget/:id',authenticateUser, budgetController.deleteBudget);

module.exports = router;
