'use client';

import { DollarSign } from 'lucide-react';

export default function PayrollAnalytics() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-purple-500" />
        Payroll Analytics
      </h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gross Salary vs Net Salary</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Gross: 85%</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Net: 75%</span>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Department Payroll Cost</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 w-20">Sales</span>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-[#94cb3d] h-2 rounded-full" style={{ width: '30%' }} />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">₹14.5L</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 w-20">IT</span>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-[#94cb3d] h-2 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">₹12.0L</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 w-20">HR</span>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-[#94cb3d] h-2 rounded-full" style={{ width: '15%' }} />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">₹7.5L</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 w-20">Finance</span>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-[#94cb3d] h-2 rounded-full" style={{ width: '20%' }} />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">₹10.0L</span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Deductions</span>
            <span className="text-sm font-bold text-red-600">₹4.8L</span>
          </div>
        </div>
      </div>
    </div>
  );
}
