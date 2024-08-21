const analyticsService = require('../services/analyticsService');
const { roundToTwoDecimals } = require('../utils/helpers');

exports.getTotalSales = async (req, res) => {
  try {
    const { interval } = req.query;
    const result = await analyticsService.getTotalSales(interval);
    res.json(result.map(item => ({
      period: item.period,
      total_price: roundToTwoDecimals(item.totalSales)
    })));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching total sales data' });
  }
};

exports.getSalesGrowthRate = async (req, res) => {
  try {
    const { interval } = req.query;
    const result = await analyticsService.getSalesGrowthRate(interval);
    res.json(result.map(item => ({
      ...item,
      growthRates: item.growthRates.map(rate => ({
        ...rate,
        growthRate: roundToTwoDecimals(rate.growthRate)
      }))
    })));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching sales growth rate data' });
  }
};

exports.getNewCustomers = async (req, res) => {
  try {
    const { interval } = req.query;
    const result = await analyticsService.getNewCustomers(interval);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching new customers data' });
  }
};

exports.getRepeatCustomers = async (req, res) => {
  try {
    const { interval } = req.query;
    const result = await analyticsService.getRepeatCustomers(interval);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching repeat customers data' });
  }
};

exports.getCustomerGeography = async (req, res) => {
  try {
    const result = await analyticsService.getCustomerGeography();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching customer geography data' });
  }
};

exports.getCustomerLifetimeValue = async (req, res) => {
  try {
    const result = await analyticsService.getCustomerLifetimeValue();
    res.json(result.map(item => ({
      ...item,
      averageLifetimeValue: roundToTwoDecimals(item.averageLifetimeValue)
    })));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching customer lifetime value data' });
  }
};