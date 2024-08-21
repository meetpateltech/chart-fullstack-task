import React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface SalesGrowthRateChartProps {
  data: Array<{ growthRates: Array<{ period: string; growthRate: number }> }>;
  interval: string;
}

const chartConfig = {
  growthRate: {
    label: 'Growth Rate',
    color: 'hsl(var(--chart-2))',
  },
};

export function SalesGrowthRateChart({ data, interval }: SalesGrowthRateChartProps) {
  
  const flattenedData = data[0]?.growthRates || [];

  const formatXAxis = (tickItem: string) => {
    if (interval === 'daily') {
      return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return tickItem;
  };

  const formatYAxis = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background text-foreground p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{formatXAxis(label)}</p>
          <p>Growth Rate: {formatYAxis(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={flattenedData}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="period"
            tickFormatter={formatXAxis}
            interval={interval === 'daily' ? Math.floor(flattenedData.length / 10) : 0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="growthRate"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}