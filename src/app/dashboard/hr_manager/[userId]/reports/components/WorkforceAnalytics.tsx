'use client';

import { PieChart } from 'lucide-react';

export default function WorkforceAnalytics() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <PieChart className="h-5 w-5 text-blue-500" />
        Workforce Analytics
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Employee Distribution</p>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Department Wise Employees</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '35%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Sales: 35%</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '25%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">IT: 25%</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: '20%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">HR: 20%</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-amber-500 h-3 rounded-full" style={{ width: '20%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Finance: 20%</span>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gender Distribution</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-teal-500 h-3 rounded-full" style={{ width: '60%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Male: 60%</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div className="bg-pink-500 h-3 rounded-full" style={{ width: '40%' }} />
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Female: 40%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
