'use client';

import { DollarSign, Shield } from 'lucide-react';

export default function PayrollMasterReport() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-indigo-500" />
        Payroll Master Report
      </h2>

      <div className="mb-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Salary Structure Report</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Structure</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Employees Assigned</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">Executive Level</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">150</td>
                <td className="py-2 px-3 text-xs text-green-600">Active</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">Manager Level</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">50</td>
                <td className="py-2 px-3 text-xs text-green-600">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          Components
        </p>
        <div className="grid grid-cols-2 gap-2">
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">Basic Salary</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">HRA</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">Special Allowance</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">Bonus</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">PF</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">ESI</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">TDS</span>
        </div>
      </div>
    </div>
  );
}
