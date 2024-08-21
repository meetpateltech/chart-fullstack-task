import React, { useEffect, useState } from 'react';
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
  const [formattedData, setFormattedData] = useState<Array<{
    period: string;
    growthRate: number;
    formattedPeriod: string;
    formattedGrowthRate: string;
  }>>([]);

  useEffect(() => {
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

    const newData = flattenedData.map(item => ({
      ...item,
      formattedPeriod: formatXAxis(item.period),
      formattedGrowthRate: formatYAxis(item.growthRate)
    }));

    setFormattedData(newData);
  }, [data, interval]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background text-foreground p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{payload[0].payload.formattedPeriod}</p>
          <p>Growth Rate: {payload[0].payload.formattedGrowthRate}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
