  const { Budget, Category } = require('../models');

  
  exports.createBudget = async (req, res) => {
    const user_id = req.user.id;
    const { category_id, monthly_budget, budget_period } = req.body;

    try {
      
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      
      const budget = await Budget.create({ user_id, category_id, monthly_budget, budget_period });
      res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  
  exports.getBudgetsByUser = async (req, res) => {
    const user_id = req.user.id;

    try {
      const budgets = await Budget.findAll({
        where: { user_id },
        include: [
          {
            model: Category,
            attributes: ['name'], 
            as: 'category', 
          },
        ],
      });
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  
  exports.updateBudget = async (req, res) => {
    const { id } = req.params; 
    const { monthly_budget, budget_period } = req.body; 
    const userId = req.user.id; 

    try {
      
      const budget = await Budget.findOne({
        where: {
          id,
          user_id: userId, 
        },
      });

      if (!budget) {
        return res.status(404).json({ message: 'Budget not found or you do not have permission to update it' });
      }

      
      budget.monthly_budget = monthly_budget;
      budget.budget_period = budget_period; 

      await budget.save();

      res.status(200).json({ message: 'Budget updated successfully', budget });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Server error', error });
    }
  };


  
  exports.deleteBudget = async (req, res) => {
    const { id } = req.params; 

    try {
      
      const budget = await Budget.findByPk(id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      
      await budget.destroy();

      res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
