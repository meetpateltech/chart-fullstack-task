import React from 'react';
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background text-foreground p-2 border border-border rounded shadow">
          <p className="font-semibold">{formatXAxis(label)}</p>
          <p>Total Sales: {formatYAxis(payload[0].value)}</p>
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
            dataKey="period"
            tickFormatter={formatXAxis}
            interval={interval === 'daily' ? Math.floor(data.length / 10) : 0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_price" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}