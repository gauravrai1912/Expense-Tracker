const { Category,Expense } = require('../models');

// Controller to add a new category
exports.addCategory = async (req, res) => {
  const {name } = req.body;
  const user_id = req.user.id; // Assuming you're extracting userId from the JWT

  try {
    // Check if the category already exists for the user
    const categoryExists = await Category.findOne({
      where: {
        name,
        user_id, // Include userId in the condition
      },
    });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create new category
    const newCategory = await Category.create({ 
      name, 
      user_id, // Add userId when creating the category
    });

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(500).json({ message: 'Server error', error });
  }
};


// Controller to get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get a category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.getCategoriesByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await Category.findAll({
      where: { user_id: userId }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Category.findOne({ where: { id, user_id: userId } });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params; // Extracting category ID from the request parameters
  const { name } = req.body; // New name from the request body
  const userId = req.user.id; // Extract userId from the JWT

  try {
    // Find the category by ID and userId to ensure the category belongs to the authenticated user
    const category = await Category.findOne({
      where: {
        id,
        user_id: userId, // Ensure only the owner of the category can update it
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found or you do not have permission to update it' });
    }

    // Update category name
    category.name = name;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};

// In your categories controller
exports.getCategoryByName = async (req, res) => {
  const { name } = req.query; // Extract name from query parameters
  const user_id = req.user.id; // Assuming you want to get categories for the logged-in user

  try {
    const category = await Category.findOne({
      where: { name, user_id },
    });

    if (category) {
      res.status(200).json({ id: category.id, name: category.name }); // Return the category's ID and name
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};








