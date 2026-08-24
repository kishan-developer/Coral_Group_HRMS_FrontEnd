'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', performance: 85, productivity: 82, attendance: 90 },
  { name: 'Week 2', performance: 88, productivity: 85, attendance: 92 },
  { name: 'Week 3', performance: 87, productivity: 84, attendance: 91 },
  { name: 'Week 4', performance: 90, productivity: 88, attendance: 93 },
  { name: 'Week 5', performance: 92, productivity: 89, attendance: 94 },
  { name: 'Week 6', performance: 89, productivity: 87, attendance: 92 },
  { name: 'Week 7', performance: 91, productivity: 90, attendance: 95 },
  { name: 'Week 8', performance: 93, productivity: 91, attendance: 94 },
];

export default function PerformanceOverviewChart() {
  const [timeline, setTimeline] = useState('weekly');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Employee Performance Trend</h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setTimeline('daily')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeline === 'daily'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeline('weekly')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeline === 'weekly'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeline('monthly')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeline === 'monthly'
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-700" />
          <XAxis 
            dataKey="name" 
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
          <Line 
            type="monotone" 
            dataKey="performance" 
            stroke="#94cb3d" 
            strokeWidth={2}
            name="Performance Score"
            dot={{ fill: '#94cb3d', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="productivity" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Productivity"
            dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="attendance" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            name="Attendance"
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
