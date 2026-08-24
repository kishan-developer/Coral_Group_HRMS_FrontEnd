'use client';

import { Calendar, CheckCircle2, Clock, AlertCircle, Target, TrendingUp, DollarSign } from 'lucide-react';

export default function EmployeeKPISection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Attendance KPI */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#94cb3d]" />
          Attendance KPI
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Present Days</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">22</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Absent Days</span>
            <span className="text-lg font-semibold text-red-600">2</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Late Entries</span>
            <span className="text-lg font-semibold text-amber-600">3</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Leave Taken</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">3</span>
          </div>
        </div>
      </div>

      {/* Productivity KPI */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-blue-500" />
          Productivity KPI
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Tasks Assigned</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">150</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Tasks Completed</span>
            <span className="text-lg font-semibold text-green-600">142</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Pending Tasks</span>
            <span className="text-lg font-semibold text-amber-600">8</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Completion Rate</span>
            <span className="text-lg font-semibold text-[#94cb3d]">94.7%</span>
          </div>
        </div>
      </div>

      {/* Sales KPI */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-500" />
          Sales KPI
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Target</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">₹5,00,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Achieved Amount</span>
            <span className="text-lg font-semibold text-green-600">₹4,60,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Achievement %</span>
            <span className="text-lg font-semibold text-blue-600">92%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Conversion Rate</span>
            <span className="text-lg font-semibold text-[#94cb3d]">24.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
