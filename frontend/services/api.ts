import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTotalSales = async (interval: string) => {
  const response = await axios.get(`${API_BASE_URL}/total-sales?interval=${interval}`);
  return response.data;
};

export const fetchSalesGrowthRate = async (interval: string) => {
  const response = await axios.get(`${API_BASE_URL}/sales-growth-rate?interval=${interval}`);
  return response.data;
};

export const fetchNewCustomers = async (interval: string) => {
  const response = await axios.get(`${API_BASE_URL}/new-customers?interval=${interval}`);
  return response.data;
};

export const fetchRepeatCustomers = async (interval: string) => {
  const response = await axios.get(`${API_BASE_URL}/repeat-customers?interval=${interval}`);
  return response.data;
};

export const fetchCustomerGeography = async () => {
  const response = await axios.get(`${API_BASE_URL}/customer-geography`);
  return response.data;
};

export const fetchCustomerLifetimeValue = async () => {
  const response = await axios.get(`${API_BASE_URL}/customer-lifetime-value`);
  return response.data;
};