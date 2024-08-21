const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/total-sales', analyticsController.getTotalSales);
router.get('/sales-growth-rate', analyticsController.getSalesGrowthRate);
router.get('/new-customers', analyticsController.getNewCustomers);
router.get('/repeat-customers', analyticsController.getRepeatCustomers);
router.get('/customer-geography', analyticsController.getCustomerGeography);
router.get('/customer-lifetime-value', analyticsController.getCustomerLifetimeValue);

module.exports = router;