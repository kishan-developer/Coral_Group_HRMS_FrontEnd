'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { department: 'Sales', performance: 92, achievement: 95, attendance: 94 },
  { department: 'Marketing', performance: 88, achievement: 90, attendance: 92 },
  { department: 'HR', performance: 85, achievement: 87, attendance: 93 },
  { department: 'Support', performance: 90, achievement: 88, attendance: 91 },
  { department: 'Accounts', performance: 87, achievement: 85, attendance: 96 },
  { department: 'Operations', performance: 86, achievement: 84, attendance: 90 },
];

export default function DepartmentPerformanceChart() {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Department Performance</h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSelectedMetric('performance')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              selectedMetric === 'performance'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setSelectedMetric('achievement')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              selectedMetric === 'achievement'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Achievement
          </button>
          <button
            onClick={() => setSelectedMetric('attendance')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              selectedMetric === 'attendance'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Attendance
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-700" />
          <XAxis 
            dataKey="department" 
            stroke="#71717a"
            className="text-xs"
          />
          <YAxis 
            stroke="#71717a"
            className="text-xs"
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '8px',
            }}
            itemStyle={{ color: '#f4f4f5' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar 
            dataKey="performance" 
            fill="#94cb3d" 
            name="Performance Score"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="achievement" 
            fill="#3b82f6" 
            name="Achievement %"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="attendance" 
            fill="#8b5cf6" 
            name="Attendance %"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
