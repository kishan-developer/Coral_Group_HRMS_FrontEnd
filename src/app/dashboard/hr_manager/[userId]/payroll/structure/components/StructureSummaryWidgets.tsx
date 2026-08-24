'use client';

import { Layers, CheckCircle, Users, Clock } from 'lucide-react';

export default function StructureSummaryWidgets() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Total Structures */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Structures</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">12</div>
        <div className="text-xs text-zinc-500 mt-1">All structures</div>
      </div>

      {/* Active Structures */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">10</div>
        <div className="text-xs text-zinc-500 mt-1">Currently active</div>
      </div>

      {/* Employees Assigned */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Assigned</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">250</div>
        <div className="text-xs text-zinc-500 mt-1">Employees</div>
      </div>

      {/* Updated This Month */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Updated</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">3</div>
        <div className="text-xs text-zinc-500 mt-1">This month</div>
      </div>
    </div>
  );
}
