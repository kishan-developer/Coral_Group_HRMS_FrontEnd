'use client';

import { History } from 'lucide-react';

export default function MasterDataAuditReport() {
  const auditLogs = [
    { module: 'Department', action: 'Created', user: 'Admin', date: 'Today' },
    { module: 'Shift', action: 'Updated', user: 'HR', date: 'Today' },
    { module: 'Leave Type', action: 'Deleted', user: 'Admin', date: 'Yesterday' },
    { module: 'Designation', action: 'Activated', user: 'HR Manager', date: 'Yesterday' },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Created': return 'bg-green-100 text-green-700';
      case 'Updated': return 'bg-blue-100 text-blue-700';
      case 'Deleted': return 'bg-red-100 text-red-700';
      case 'Activated': return 'bg-purple-100 text-purple-700';
      case 'Deactivated': return 'bg-amber-100 text-amber-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <History className="h-5 w-5 text-zinc-500" />
        Master Data Audit Report
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Track changes in master data</p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Module</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Action</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">User</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{log.module}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{log.user}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Audit Actions</p>
        <div className="flex flex-wrap gap-2">
          {['Created', 'Updated', 'Deleted', 'Activated', 'Deactivated'].map((action) => (
            <span key={action} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300">{action}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
