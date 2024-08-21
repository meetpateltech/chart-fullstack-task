import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface NewCustomersChartProps {
  data: Array<{ _id: string; newCustomers: number }>;
  interval: string;
}

const chartConfig = {
  newCustomers: {
    label: 'New Customers',
    color: 'hsl(var(--chart-3))',
  },
};

export function NewCustomersChart({ data, interval }: NewCustomersChartProps) {
  const formatXAxis = (tickItem: string) => {
    if (interval === 'daily') {
      return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return tickItem;
  };

  const formatYAxis = (value: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background text-foreground p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{formatXAxis(label)}</p>
          <p>New Customers: {formatYAxis(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="_id"
            tickFormatter={formatXAxis}
            interval={interval === 'daily' ? Math.floor(data.length / 10) : 0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="newCustomers"
            fill="hsl(var(--chart-3))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}