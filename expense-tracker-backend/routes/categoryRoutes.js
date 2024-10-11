const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const  authenticateUser  = require('../middleware/auth');
router.post('/add',authenticateUser, categoryController.addCategory);

router.get('/getCategories', authenticateUser,categoryController.getCategories);

router.get('/getCategory/:id',authenticateUser, categoryController.getCategoryById);

router.get('/userCategories/',authenticateUser, categoryController.getCategoriesByUser);

router.delete('/deleteCategory/:id',authenticateUser, categoryController.deleteCategory);

router.put('/updateCategory/:id',authenticateUser, categoryController.updateCategory);

router.get('/getCategoryByName',authenticateUser, categoryController.getCategoryByName);

module.exports = router;
