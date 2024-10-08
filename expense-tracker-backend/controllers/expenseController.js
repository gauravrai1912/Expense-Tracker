const { Expense } = require('../models');
const { Category } = require('../models');
// Create a new expense
exports.createExpense = async (req, res) => {
  const user_id = req.user.id; // Assuming you have middleware that sets req.user
  const { category_id, amount, date, description, receipt_url } = req.body;

  try {
    // Check if the category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create the expense
    const expense = await Expense.create({ user_id, category_id, amount, date, description, receipt_url });
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Category,
          attributes: ['name'], // Include only the name of the category
          as: 'category', // Make sure this matches your association alias
        },
      ]
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};

exports.updateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id, amount, date , description, receipt_url } = req.body;
      const userId = req.user.id;
  
      // Find the expense by ID and user_id
      const expense = await Expense.findOne({ where: { id, user_id: userId } });
  
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
  
      // Update the expense
      expense.category_id = category_id || expense.category_id;
      expense.amount = amount || expense.amount;
      expense.date = date || expense.date;
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
