const { Category,Expense } = require('../models');


exports.addCategory = async (req, res) => {
  const {name } = req.body;
  const user_id = req.user.id; 

  try {
    
    const categoryExists = await Category.findOne({
      where: {
        name,
        user_id, 
      },
    });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    
    const newCategory = await Category.create({ 
      name, 
      user_id, 
    });

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


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
  const { id } = req.params; 
  const { name } = req.body; 
  const userId = req.user.id; 

  try {
    
    const category = await Category.findOne({
      where: {
        id,
        user_id: userId, 
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found or you do not have permission to update it' });
    }

    
    category.name = name;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getCategoryByName = async (req, res) => {
  const { name } = req.query; 
  const user_id = req.user.id; 

  try {
    const category = await Category.findOne({
      where: { name, user_id },
    });

    if (category) {
      res.status(200).json({ id: category.id, name: category.name }); 
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};








