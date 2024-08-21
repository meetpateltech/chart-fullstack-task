const { getDb } = require('../config/database');
const {
  getTotalSalesPipeline,
  getSalesGrowthRatePipeline,
  getNewCustomersPipeline,
  getRepeatCustomersPipeline,
  getCustomerGeographyPipeline,
  getCustomerLifetimeValuePipeline
} = require('../utils/helpers');

exports.getTotalSales = async (interval) => {
  const db = getDb();
  const pipeline = getTotalSalesPipeline(interval);
  return await db.collection('shopifyOrders').aggregate(pipeline).toArray();
};

exports.getSalesGrowthRate = async (interval) => {
  const db = getDb();
  const pipeline = getSalesGrowthRatePipeline(interval);
  return await db.collection('shopifyOrders').aggregate(pipeline).toArray();
};

exports.getNewCustomers = async (interval) => {
  const db = getDb();
  const pipeline = getNewCustomersPipeline(interval);
  return await db.collection('shopifyCustomers').aggregate(pipeline).toArray();
};

exports.getRepeatCustomers = async (interval) => {
  const db = getDb();
  const pipeline = getRepeatCustomersPipeline(interval);
  return await db.collection('shopifyOrders').aggregate(pipeline).toArray();
};

exports.getCustomerGeography = async () => {
  const db = getDb();
  const pipeline = getCustomerGeographyPipeline();
  return await db.collection('shopifyCustomers').aggregate(pipeline).toArray();
};

exports.getCustomerLifetimeValue = async () => {
  const db = getDb();
  const pipeline = getCustomerLifetimeValuePipeline();
  return await db.collection('shopifyOrders').aggregate(pipeline).toArray();
};