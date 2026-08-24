'use client';

import { Users, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function LeaveTypeUsageStatistics() {
  const statistics = [
    { leaveType: 'Casual Leave', employeesUsing: 180, requestsThisYear: 650 },
    { leaveType: 'Paternity Leave', employeesUsing: 15, requestsThisYear: 28 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Leave Type Usage Statistics</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Leave Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Users className="h-4 w-4 inline mr-2" />
                Employees Using
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <FileText className="h-4 w-4 inline mr-2" />
                Requests This Year
              </th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{stat.leaveType}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{stat.employeesUsing}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{stat.requestsThisYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
