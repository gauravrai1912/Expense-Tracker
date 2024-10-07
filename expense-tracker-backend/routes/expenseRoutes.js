const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const  authenticateUser  = require('../middleware/auth');

router.post('/expenses', authenticateUser, expenseController.createExpense);
router.get('/expenses', authenticateUser, expenseController.getExpenses);
router.put('/expenses/:id', authenticateUser, expenseController.updateExpense);
router.delete('/expenses/:id', authenticateUser, expenseController.deleteExpense);

module.exports = router;
