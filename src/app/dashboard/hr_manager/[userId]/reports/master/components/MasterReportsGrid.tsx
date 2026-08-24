'use client';

import { Eye } from 'lucide-react';

export default function MasterReportsGrid() {
  const reports = [
    { id: 1, name: 'Employee Master', module: 'Employee', records: 250, lastUpdated: 'Today' },
    { id: 2, name: 'Department Master', module: 'Organization', records: 12, lastUpdated: 'Yesterday' },
    { id: 3, name: 'Shift Master', module: 'Attendance', records: 8, lastUpdated: 'Today' },
    { id: 4, name: 'Leave Type Master', module: 'Leave', records: 10, lastUpdated: 'Today' },
    { id: 5, name: 'Salary Structure Master', module: 'Payroll', records: 15, lastUpdated: '2 days ago' },
    { id: 6, name: 'Role Master', module: 'User & Role', records: 5, lastUpdated: 'Yesterday' },
  ];

  const handleView = (id: number) => {
    alert(`Viewing report ${id}`);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Master Reports Grid</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Report Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Module</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Records</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Last Updated</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{report.name}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.module}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.records}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{report.lastUpdated}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleView(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
