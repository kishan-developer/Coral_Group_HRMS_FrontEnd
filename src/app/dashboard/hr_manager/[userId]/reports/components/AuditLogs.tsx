'use client';

import { History } from 'lucide-react';

export default function AuditLogs() {
  const auditLogs = [
    { user: 'Admin', action: 'Generated', report: 'Payroll Report', date: '01 Jun 2026 10:30 AM' },
    { user: 'HR Manager', action: 'Downloaded', report: 'Leave Report', date: '01 Jun 2026 09:15 AM' },
    { user: 'Admin', action: 'Scheduled', report: 'Attendance Report', date: '31 May 2026 04:45 PM' },
    { user: 'Finance Head', action: 'Generated', report: 'Salary Register', date: '31 May 2026 02:30 PM' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <History className="h-5 w-5 text-zinc-500" />
        Audit Logs
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Track all report activities</p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">User</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Action</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Report</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{log.user}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    log.action === 'Generated' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Downloaded' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{log.report}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
