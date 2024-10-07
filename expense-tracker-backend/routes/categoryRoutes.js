const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const  authenticateUser  = require('../middleware/auth');
// Route to add a new category
router.post('/add',authenticateUser, categoryController.addCategory);

// Route to get all categories
router.get('/getCategories', authenticateUser,categoryController.getCategories);

// Route to get a category by ID
router.get('/getCategory/:id',authenticateUser, categoryController.getCategoryById);

router.get('/userCategories/',authenticateUser, categoryController.getCategoriesByUser);

router.delete('/deleteCategory/:id',authenticateUser, categoryController.deleteCategory);

router.put('/updateCategory/:id',authenticateUser, categoryController.updateCategory);

router.get('/getCategoryByName',authenticateUser, categoryController.getCategoryByName);

module.exports = router;
