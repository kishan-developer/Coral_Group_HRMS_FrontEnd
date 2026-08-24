'use client';

import { FileText, Clock, CheckCircle, XCircle, Calendar, TrendingUp } from 'lucide-react';

export default function LeaveSummaryWidgets() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Total Leave Requests */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Requests</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">156</div>
        <div className="text-xs text-zinc-500 mt-1">This month</div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pending</span>
        </div>
        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</div>
        <div className="text-xs text-zinc-500 mt-1">Awaiting approval</div>
      </div>

      {/* Approved Leaves */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Approved</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">138</div>
        <div className="text-xs text-zinc-500 mt-1">This month</div>
      </div>

      {/* Rejected Leaves */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Rejected</span>
        </div>
        <div className="text-2xl font-bold text-red-600 dark:text-red-400">6</div>
        <div className="text-xs text-zinc-500 mt-1">This month</div>
      </div>

      {/* Today on Leave */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Today on Leave</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">8</div>
        <div className="text-xs text-zinc-500 mt-1">Currently absent</div>
      </div>

      {/* Upcoming Leaves */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Upcoming</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">15</div>
        <div className="text-xs text-zinc-500 mt-1">Next 7 days</div>
      </div>
    </div>
  );
}
