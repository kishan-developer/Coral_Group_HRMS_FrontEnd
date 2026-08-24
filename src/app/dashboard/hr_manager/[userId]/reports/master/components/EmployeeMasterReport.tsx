'use client';

import { Users, BarChart3 } from 'lucide-react';

export default function EmployeeMasterReport() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        Employee Master Report
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Filters</p>
          <div className="grid grid-cols-2 gap-2">
            <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100">
              <option>Department</option>
              <option>Sales</option>
              <option>HR</option>
            </select>
            <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100">
              <option>Designation</option>
              <option>Manager</option>
              <option>Executive</option>
            </select>
            <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100">
              <option>Branch</option>
              <option>Headquarters</option>
              <option>North</option>
            </select>
            <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100">
              <option>Employee Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Columns</p>
          <div className="flex flex-wrap gap-2">
            {['Employee ID', 'Name', 'Department', 'Designation', 'Branch', 'Status'].map((col) => (
              <span key={col} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">{col}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Export</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">Excel</button>
            <button className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">PDF</button>
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}
