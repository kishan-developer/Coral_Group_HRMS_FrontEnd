'use client';

import { PieChart } from 'lucide-react';

export default function SalaryBreakdownChart() {
  const breakdown = [
    { label: 'Basic Salary', value: 55, color: 'bg-blue-500' },
    { label: 'Allowances', value: 25, color: 'bg-green-500' },
    { label: 'Bonuses', value: 10, color: 'bg-purple-500' },
    { label: 'Deductions', value: 10, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <PieChart className="h-5 w-5 text-blue-500" />
        Salary Breakdown
      </h2>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="55 100" strokeDashoffset="0" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="-55" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="-80" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="-90" />
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
