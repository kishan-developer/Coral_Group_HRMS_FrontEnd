'use client';

import { FileText, PieChart } from 'lucide-react';

export default function LeaveMasterReport() {
  const leaveTypes = [
    { name: 'Casual Leave', annualLimit: 12, paid: true, active: true },
    { name: 'Sick Leave', annualLimit: 10, paid: true, active: true },
    { name: 'Earned Leave', annualLimit: 15, paid: true, active: true },
    { name: 'Unpaid Leave', annualLimit: 0, paid: false, active: true },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-teal-500" />
        Leave Master Report
      </h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Leave Type</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Annual Limit</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Paid</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Active</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.map((leave, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">{leave.name}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{leave.annualLimit} days</td>
                <td className="py-2 px-3 text-xs">{leave.paid ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</td>
                <td className="py-2 px-3 text-xs">{leave.active ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
          <PieChart className="h-4 w-4 text-blue-500" />
          Analytics
        </p>
        <div className="space-y-2">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Leave Policy Summary</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Leave Type Usage</p>
        </div>
      </div>
    </div>
  );
}
