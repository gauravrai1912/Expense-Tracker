const { Expense } = require('../models');

exports.createExpense = async (req, res) => {
  try {
    const { category_id, amount, description, receipt_url } = req.body;
    const userId = req.user.id;  // Assuming JWT middleware sets req.user

    const newExpense = await Expense.create({
      user_id: userId,
      category_id,
      amount,
      description,
      receipt_url
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error creating expense' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.findAll({
      where: { user_id: userId }
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};

exports.updateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id, amount, description, receipt_url } = req.body;
      const userId = req.user.id;
  
      // Find the expense by ID and user_id
      const expense = await Expense.findOne({ where: { id, user_id: userId } });
  
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
  
      // Update the expense
      expense.category_id = category_id || expense.category_id;
      expense.amount = amount || expense.amount;
      expense.description = description || expense.description;
      expense.receipt_url = receipt_url || expense.receipt_url;
  
      await expense.save();
  
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Error updating expense' });
    }
  };
  

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ where: { id, user_id: userId } });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
};
