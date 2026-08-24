'use client';

import { Calendar, Clock, TrendingUp } from 'lucide-react';

export default function LeaveSummaryWidgets() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* CL Stats */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">CL Total</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">12</div>
        <div className="text-xs text-zinc-500 mt-1">Per year</div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">CL Used</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">5</div>
        <div className="text-xs text-zinc-500 mt-1">This year</div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">CL Balance</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">7</div>
        <div className="text-xs text-zinc-500 mt-1">Remaining</div>
      </div>

      {/* PL Stats */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">PL Total</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">15</div>
        <div className="text-xs text-zinc-500 mt-1">Per year</div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">PL Used</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">8</div>
        <div className="text-xs text-zinc-500 mt-1">This year</div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">PL Balance</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">7</div>
        <div className="text-xs text-zinc-500 mt-1">Remaining</div>
      </div>
    </div>
  );
}
