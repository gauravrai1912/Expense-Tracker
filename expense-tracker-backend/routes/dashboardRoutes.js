const express = require('express');
const {getDashboardOverview , getSpendingTrends} = require('../controllers/dashboardController');
const  authenticateToken  = require('../middleware/auth'); 

const router = express.Router();


router.get('/', authenticateToken, getDashboardOverview);

router.get('/trends', authenticateToken, getSpendingTrends);

module.exports = router;
