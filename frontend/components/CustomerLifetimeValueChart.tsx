import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface CustomerLifetimeValueChartProps {
  data: Array<{ _id: string; averageLifetimeValue: number }>;
}

const chartConfig = {
  averageLifetimeValue: {
    label: 'Average Lifetime Value',
    color: 'hsl(var(--chart-1))',
  },
};

export function CustomerLifetimeValueChart({ data }: CustomerLifetimeValueChartProps) {
  const formatXAxis = (tickItem: string) => {
    // Assuming _id is a date string. Adjust if it's not.
    return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
        <div className="bg-background text-foreground p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{formatXAxis(label)}</p>
          <p>Average Lifetime Value: {formatYAxis(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="_id"
            tickFormatter={formatXAxis}
            interval={Math.floor(data.length / 10)}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="averageLifetimeValue"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}