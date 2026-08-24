'use client';

import { X, Plus, Download, Calendar } from 'lucide-react';

interface CustomReportBuilderProps {
  onClose: () => void;
}

export default function CustomReportBuilder({ onClose }: CustomReportBuilderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Custom Report Builder</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Select Module */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Select Module</label>
            <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <option>Employees</option>
              <option>Attendance</option>
              <option>Payroll</option>
              <option>Leave</option>
              <option>Performance</option>
            </select>
          </div>

          {/* Select Fields */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Select Fields</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Employee Name', 'Department', 'Salary', 'Attendance', 'Leave Balance', 'Joining Date'].map((field) => (
                <label key={field} className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{field}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Apply Filters</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <option>Department</option>
                <option>Sales</option>
                <option>HR</option>
              </select>
              <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <option>Branch</option>
                <option>Headquarters</option>
                <option>North</option>
              </select>
              <input type="text" placeholder="Date Range" className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" />
              <select className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <option>Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => alert('Previewing report...')}
              className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Preview Report
            </button>
            <button
              onClick={() => alert('Downloading report...')}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={() => alert('Scheduling report...')}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
