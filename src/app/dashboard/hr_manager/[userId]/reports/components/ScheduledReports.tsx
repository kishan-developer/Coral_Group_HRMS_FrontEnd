'use client';

import { Calendar, Clock, Mail, Bell } from 'lucide-react';

export default function ScheduledReports() {
  const scheduledReports = [
    { report: 'Payroll Summary', frequency: 'Monthly', recipients: 'HR Team', nextRun: '01 Jul 2026' },
    { report: 'Attendance Report', frequency: 'Weekly', recipients: 'Managers', nextRun: 'Monday' },
    { report: 'Leave Summary', frequency: 'Monthly', recipients: 'All Managers', nextRun: '01 Jul 2026' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Scheduled Reports
        </h2>
        <button
          onClick={() => alert('Schedule new report...')}
          className="flex items-center gap-2 px-3 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
        >
          <Clock className="h-4 w-4" />
          Add Schedule
        </button>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Report</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Frequency</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Recipients</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Next Run</th>
            </tr>
          </thead>
          <tbody>
            {scheduledReports.map((report, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{report.report}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.frequency}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.recipients}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.nextRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Schedule Options</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((option) => (
            <label key={option} className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{option}</span>
            </label>
          ))}
        </div>

        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Delivery Methods</h3>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <input type="checkbox" className="rounded" />
            <Mail className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Email</span>
          </label>
          <label className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <input type="checkbox" className="rounded" />
            <Bell className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Notification</span>
          </label>
        </div>
      </div>
    </div>
  );
}
