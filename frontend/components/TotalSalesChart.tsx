import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface TotalSalesChartProps {
  data: Array<{ period: string; total_price: number }>;
  interval: string;
}

const chartConfig = {
  total_price: {
    label: 'Total Sales',
    color: 'hsl(var(--chart-1))',
  },
};

export function TotalSalesChart({ data, interval }: TotalSalesChartProps) {
  const [formattedData, setFormattedData] = useState(data);

  useEffect(() => {
    const formatXAxis = (tickItem: string) => {
      if (interval === 'daily') {
        return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return tickItem;
    };

    const formatYAxis = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    const newData = data.map(item => ({
      ...item,
      formattedPeriod: formatXAxis(item.period),
      formattedTotal: formatYAxis(item.total_price)
    }));

    setFormattedData(newData);
  }, [data, interval]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background text-foreground p-2 border border-border rounded shadow">
          <p className="font-semibold">{payload[0].payload.formattedPeriod}</p>
          <p>Total Sales: {payload[0].payload.formattedTotal}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="formattedPeriod"
            interval={interval === 'daily' ? Math.floor(formattedData.length / 10) : 0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_price" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
