const { Expense, Budget, Category, sequelize } = require('../models');
const { Op } = require('sequelize');

// Get total expenses for the current month
exports.getTotalExpenses = async (req, res) => {
  const  user_id  = req.user.id;  // Correctly using user_id from the token

  try {
    const currentMonth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const totalExpenses = await Expense.sum('amount', {
      where: {
        user_id,
        date: {
          [Op.gte]: new Date(year, currentMonth - 1, 1),    // First day of the month
          [Op.lt]: new Date(year, currentMonth, 1),         // First day of next month
        },
      },
    });

    res.status(200).json({ totalExpenses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    console.log(error);
  }
};

// Get overspending categories
exports.getOverspendingCategories = async (req, res) => {
  const user_id = req.user.id;  // Correctly using user_id from the token

  try {
    const overspendingCategories = await sequelize.query(`
      SELECT c.name AS category, SUM(e.amount) AS total_spent, b.monthly_budget
      FROM expenses e
      INNER JOIN "Budgets" b ON e.category_id = b.category_id
      INNER JOIN "Categories" c ON c.id = e.category_id
      WHERE e.user_id = :user_id
      AND EXTRACT(MONTH FROM e.date) = EXTRACT(MONTH FROM CURRENT_DATE)
      GROUP BY c.name, b.monthly_budget
      HAVING SUM(e.amount) > b.monthly_budget
    `, {
      replacements: { user_id },
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(overspendingCategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
