const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const  authenticateUser  = require('../middleware/auth');


router.post('/addBudget',authenticateUser, budgetController.createBudget);

router.get('/userBudgets',authenticateUser, budgetController.getBudgetsByUser);

router.put('/updateBudget/:id',authenticateUser,budgetController.updateBudget);

router.delete('/deleteBudget/:id',authenticateUser, budgetController.deleteBudget);

module.exports = router;
