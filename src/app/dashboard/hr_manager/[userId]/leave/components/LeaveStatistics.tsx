'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Casual Leave', value: 35, color: '#94cb3d' },
  { name: 'Sick Leave', value: 25, color: '#3b82f6' },
  { name: 'Earned Leave', value: 20, color: '#8b5cf6' },
  { name: 'Maternity Leave', value: 10, color: '#ec4899' },
  { name: 'Paternity Leave', value: 5, color: '#f59e0b' },
  { name: 'Unpaid Leave', value: 5, color: '#6b7280' },
];

const lineData = [
  { month: 'Jan', requests: 45, approvals: 38, rejections: 7 },
  { month: 'Feb', requests: 52, approvals: 45, rejections: 7 },
  { month: 'Mar', requests: 48, approvals: 42, rejections: 6 },
  { month: 'Apr', requests: 55, approvals: 48, rejections: 7 },
  { month: 'May', requests: 50, approvals: 43, rejections: 7 },
  { month: 'Jun', requests: 45, approvals: 40, rejections: 5 },
];

export default function LeaveStatistics() {
  const [chartType, setChartType] = useState<'pie' | 'line'>('pie');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {chartType === 'pie' ? 'Leave Distribution' : 'Monthly Leave Trend'}
        </h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              chartType === 'pie'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Pie Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              chartType === 'line'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Line Chart
          </button>
        </div>
      </div>

      {chartType === 'pie' ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(24 24 27)',
                border: '1px solid rgb(63 63 70)',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#f4f4f5' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-700" />
            <XAxis dataKey="month" stroke="#71717a" className="text-xs" />
            <YAxis stroke="#71717a" className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(24 24 27)',
                border: '1px solid rgb(63 63 70)',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#f4f4f5' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="requests" stroke="#94cb3d" strokeWidth={2} name="Requests" />
            <Line type="monotone" dataKey="approvals" stroke="#3b82f6" strokeWidth={2} name="Approvals" />
            <Line type="monotone" dataKey="rejections" stroke="#ef4444" strokeWidth={2} name="Rejections" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
