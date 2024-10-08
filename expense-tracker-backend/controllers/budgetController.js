  const { Budget, Category } = require('../models');

  // Create a new budget for a category
  exports.createBudget = async (req, res) => {
    const user_id = req.user.id;
    const { category_id, monthly_budget, budget_period } = req.body;

    try {
      // Check if the category exists
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Create the budget
      const budget = await Budget.create({ user_id, category_id, monthly_budget, budget_period });
      res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  // Get all budgets for a user
  exports.getBudgetsByUser = async (req, res) => {
    const user_id = req.user.id;

    try {
      const budgets = await Budget.findAll({
        where: { user_id },
        include: [
          {
            model: Category,
            attributes: ['name'], // Include only the name of the category
            as: 'category', // Make sure this matches your association alias
          },
        ],
      });
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  // Update a budget
  exports.updateBudget = async (req, res) => {
    const { id } = req.params; // Extracting budget ID from the request parameters
    const { monthly_budget, budget_period } = req.body; // New values from the request body
    const userId = req.user.id; // Extract userId from the JWT

    try {
      // Find the budget by ID and userId to ensure the budget belongs to the authenticated user
      const budget = await Budget.findOne({
        where: {
          id,
          user_id: userId, // Ensure only the owner of the budget can update it
        },
      });

      if (!budget) {
        return res.status(404).json({ message: 'Budget not found or you do not have permission to update it' });
      }

      // Update budget properties
      budget.monthly_budget = monthly_budget;
      budget.budget_period = budget_period; // Update budget period if provided

      await budget.save();

      res.status(200).json({ message: 'Budget updated successfully', budget });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };


  // Delete a budget
  exports.deleteBudget = async (req, res) => {
    const { id } = req.params; // Budget ID

    try {
      // Find the budget by ID
      const budget = await Budget.findByPk(id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      // Delete the budget
      await budget.destroy();

      res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
