const { Expense, Budget, Category } = require('../models');
const { Op, Sequelize } = require('sequelize');


exports.getDashboardOverview = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query; 

  try {
   
    const startDate = new Date(`${month}-01T00:00:00Z`); 
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)); 


    let totalExpenses = await Expense.sum('amount', {
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endDate],  
        },
      },
    });

    totalExpenses = totalExpenses || 0;

    
    const budgets = await Budget.findAll({
      where: { user_id : userId, budget_period: month },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'], 
      },
    });

    const budgetVsSpending = await Promise.all(budgets.map(async (budget) => {
      const spent = await Expense.sum('amount', {
        where: {
          user_id: userId,
          category_id: budget.category_id,
          date: {
            [Op.gte]: startDate, 
            [Op.lt]: endDate,   
          },
        },
      });
      return {
        category_id: budget.category_id,
        categoryName: budget.category ? budget.category.name : 'Unknown',
        budget: budget.monthly_budget,
        spent: spent || 0,
        remaining: budget.monthly_budget - (spent || 0),
      };
    }));

    
    const spendingTrends = await Expense.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_spent'],
      ],
      where: { user_id: userId },
      group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date'))],
      order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'ASC']],
    });


    const formattedSpendingTrends = spendingTrends.map(trend => ({
      month: trend.dataValues.month.toISOString().slice(0, 7), 
      total_spent: parseFloat(trend.dataValues.total_spent),
    }));
    
    
    res.status(200).json({
      totalExpenses,
      budgetVsSpending,
      spendingTrends: formattedSpendingTrends, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// In your controller file
exports.getSpendingTrends = async (req, res) => {
  const userId = req.user.id; 

  try {
    const spendingTrends = await Expense.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_spent'],
      ],
      where: { user_id: userId },
      group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date'))],
      order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'ASC']],
    });

    const formattedSpendingTrends = spendingTrends.map(trend => ({
      month: trend.dataValues.month.toISOString().slice(0, 7), 
      total_spent: parseFloat(trend.dataValues.total_spent),
    }));
    
    res.status(200).json(formattedSpendingTrends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch spending trends' });
  }
};
