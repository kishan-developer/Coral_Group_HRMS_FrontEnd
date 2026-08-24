'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  className?: string;
}

export default function BarChart({ data, color = '#94cb3d', height = 200, className }: BarChartProps) {
  if (data.length === 0) return <div className="text-sm text-zinc-500">No data</div>;

  const chartData = data.map((d) => ({
    name: d.label,
    value: d.value,
  }));

  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
