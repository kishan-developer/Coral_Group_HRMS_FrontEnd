'use client';

import { BarChart3 } from 'lucide-react';

export default function AttendanceAnalytics() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-green-500" />
        Attendance Analytics
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Monthly trends visualization</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Present</p>
            <p className="text-lg font-bold text-green-600">96.5%</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Absent</p>
            <p className="text-lg font-bold text-red-600">2.5%</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Late</p>
            <p className="text-lg font-bold text-amber-600">1.0%</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Leave</p>
            <p className="text-lg font-bold text-blue-600">0.5%</p>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Last 6 Months Trend</p>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '92%' }} />
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '94%' }} />
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '90%' }} />
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '95%' }} />
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '96%' }} />
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '96.5%' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
