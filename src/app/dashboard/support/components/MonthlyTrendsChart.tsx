'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyTrendsChartProps {
  data?: {
    month: string;
    tickets: number;
    resolved: number;
  }[];
}

export default function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  const chartData = data || [
    { month: 'Jan', tickets: 65, resolved: 58 },
    { month: 'Feb', tickets: 72, resolved: 65 },
    { month: 'Mar', tickets: 58, resolved: 54 },
    { month: 'Apr', tickets: 81, resolved: 75 },
    { month: 'May', tickets: 95, resolved: 88 },
    { month: 'Jun', tickets: 89, resolved: 82 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Monthly Ticket Trends</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
            <XAxis 
              dataKey="month" 
              className="text-xs text-zinc-500 dark:text-zinc-400"
              stroke="#71717a"
            />
            <YAxis 
              className="text-xs text-zinc-500 dark:text-zinc-400"
              stroke="#71717a"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#1f2937',
              }}
            />
            <Legend />
            <Bar dataKey="tickets" name="New Tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
