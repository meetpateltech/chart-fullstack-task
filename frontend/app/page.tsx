'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TotalSalesChart } from '@/components/TotalSalesChart';
import { SalesGrowthRateChart } from '@/components/SalesGrowthRateChart';
import { NewCustomersChart } from '@/components/NewCustomersChart';
import { RepeatCustomersChart } from '@/components/RepeatCustomersChart';
import { CustomerGeographyChart } from '@/components/CustomerGeographyMap';
import { CustomerLifetimeValueChart } from '@/components/CustomerLifetimeValueChart';
import * as api from '@/services/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('totalSales');
  const [interval, setInterval] = useState('monthly');
  const [totalSalesData, setTotalSalesData] = useState([]);
  const [salesGrowthRateData, setSalesGrowthRateData] = useState([]);
  const [newCustomersData, setNewCustomersData] = useState([]);
  const [repeatCustomersData, setRepeatCustomersData] = useState([]);
  const [customerGeographyData, setCustomerGeographyData] = useState([]);
  const [customerLifetimeValueData, setCustomerLifetimeValueData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'totalSales') {
          const data = await api.fetchTotalSales(interval);
          setTotalSalesData(data);
        } else if (activeTab === 'salesGrowthRate') {
          const data = await api.fetchSalesGrowthRate(interval);
          setSalesGrowthRateData(data);
        } else if (activeTab === 'newCustomers') {
          const data = await api.fetchNewCustomers(interval);
          setNewCustomersData(data);
        } else if (activeTab === 'repeatCustomers') {
          const data = await api.fetchRepeatCustomers(interval);
          setRepeatCustomersData(data);
        }
      } catch (error) {
        console.error("Error fetching interval-based data:", error);
        setError("Error fetching interval-based data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, interval]);

  useEffect(() => {
    const fetchStaticData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'customerGeography') {
          const data = await api.fetchCustomerGeography();
          setCustomerGeographyData(data);
        } else if (activeTab === 'customerLifetimeValue') {
          const data = await api.fetchCustomerLifetimeValue();
          setCustomerLifetimeValueData(data);
        }
      } catch (error) {
        console.error("Error fetching static data:", error);
        setError("Error fetching static data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaticData();
  }, [activeTab]);

  const handleTabChange = (value: any) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="totalSales">Total Sales</TabsTrigger>
          <TabsTrigger value="salesGrowthRate">Sales Growth Rate</TabsTrigger>
          <TabsTrigger value="newCustomers">New Customers</TabsTrigger>
          <TabsTrigger value="repeatCustomers">Repeat Customers</TabsTrigger>
          <TabsTrigger value="customerGeography">Customer Geography</TabsTrigger>
          <TabsTrigger value="customerLifetimeValue">Customer Lifetime Value</TabsTrigger>
        </TabsList>
        {['totalSales', 'salesGrowthRate', 'newCustomers', 'repeatCustomers'].includes(activeTab) && (
          <div className="mb-4">
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="border rounded p-2"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <TabsContent value="totalSales">
              <TotalSalesChart data={totalSalesData} interval={interval} />
            </TabsContent>
            <TabsContent value="salesGrowthRate">
              <SalesGrowthRateChart data={salesGrowthRateData} interval={interval} />
            </TabsContent>
            <TabsContent value="newCustomers">
              <NewCustomersChart data={newCustomersData} interval={interval} />
            </TabsContent>
            <TabsContent value="repeatCustomers">
              <RepeatCustomersChart data={repeatCustomersData} interval={interval} />
            </TabsContent>
            <TabsContent value="customerGeography">
              <CustomerGeographyChart data={customerGeographyData} />
            </TabsContent>
            <TabsContent value="customerLifetimeValue">
              <CustomerLifetimeValueChart data={customerLifetimeValueData} />
            </TabsContent>
          </>
        )}
      </Tabs>
      <div className="fixed left-0 w-full bg-yellow-200 text-black text-center py-4 md:hidden">
        <p className="text-3xl">For a better viewing experience, please open this site on a desktop or laptop or just zoom in.</p>
      </div>
    </div>
  );
}