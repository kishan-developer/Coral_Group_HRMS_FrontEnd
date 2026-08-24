'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TicketStatusChartProps {
  data?: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function TicketStatusChart({ data }: TicketStatusChartProps) {
  const chartData = data || [
    { name: 'Open', value: 45, color: '#f97316' },
    { name: 'In Progress', value: 32, color: '#3b82f6' },
    { name: 'Resolved', value: 68, color: '#22c55e' },
    { name: 'Closed', value: 124, color: '#6b7280' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Ticket Status Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#1f2937',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {chartData.map((item) => (
          <div key={item.name} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{item.name}</span>
            </div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
