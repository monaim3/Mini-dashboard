'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color?: string;
}

export function SparklineChart({ data, color = '#f1765b' }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ day: index, sales: value }));

  return (
    <ResponsiveContainer width="100%" height={30}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="sales"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}