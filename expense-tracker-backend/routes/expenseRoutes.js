const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const  authenticateUser  = require('../middleware/auth');

router.post('/addExpense', authenticateUser, expenseController.createExpense);
router.get('/getExpenses', authenticateUser, expenseController.getExpenses);
router.put('/updateExpenses/:id', authenticateUser, expenseController.updateExpense);
router.delete('/deleteExpenses/:id', authenticateUser, expenseController.deleteExpense);

module.exports = router;
