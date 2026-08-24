'use client';

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: { label: string; value: number; color?: string }[];
  size?: number;
  className?: string;
}

const COLORS = ['#94cb3d', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export default function PieChart({ data, size = 200, className }: PieChartProps) {
  if (data.length === 0) return <div className="text-sm text-zinc-500">No data</div>;

  const chartData = data.map((d, i) => ({
    name: d.label,
    value: d.value,
    color: d.color || COLORS[i % COLORS.length],
  }));

  const radius = size * 0.4; // 40% of size for full circle

  return (
    <div className={className} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart data={chartData}>
          <Pie
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={radius}
            fill="#8884d8"
            dataKey="value"
            innerRadius={0}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
