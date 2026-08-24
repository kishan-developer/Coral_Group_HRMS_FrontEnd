'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  className?: string;
}

export default function LineChart({ data, color = '#94cb3d', height = 200, className }: LineChartProps) {
  if (data.length < 2) return <div className="text-sm text-zinc-500">Not enough data</div>;

  const chartData = data.map((d) => ({
    name: d.label,
    value: d.value,
  }));

  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ fill: color }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
