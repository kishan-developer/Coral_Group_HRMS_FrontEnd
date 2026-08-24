'use client';

import { BarChart3 } from 'lucide-react';

export default function DepartmentPayrollCost() {
  const departments = [
    { name: 'Sales', cost: 850000 },
    { name: 'HR', cost: 450000 },
    { name: 'IT', cost: 1200000 },
    { name: 'Finance', cost: 550000 },
    { name: 'Marketing', cost: 600000 },
  ];

  const maxCost = Math.max(...departments.map(d => d.cost));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-green-500" />
        Department Payroll Cost
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Monthly Payroll Expense</p>
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.name}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">₹{(dept.cost / 100000).toFixed(1)}L</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#94cb3d] to-[#7ab32e] h-2 rounded-full"
                style={{ width: `${(dept.cost / maxCost) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total</span>
          <span className="text-lg font-bold text-[#94cb3d]">₹36.5L</span>
        </div>
      </div>
    </div>
  );
}
