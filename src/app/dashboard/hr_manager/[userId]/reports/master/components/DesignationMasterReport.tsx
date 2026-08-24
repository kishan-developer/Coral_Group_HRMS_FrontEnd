'use client';

import { UserCheck, BarChart } from 'lucide-react';

export default function DesignationMasterReport() {
  const designations = [
    { name: 'Manager', department: 'Sales', employees: 5 },
    { name: 'Senior Executive', department: 'IT', employees: 15 },
    { name: 'Executive', department: 'HR', employees: 10 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-purple-500" />
        Designation Master Report
      </h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Designation</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Department</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Employees</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((desig, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">{desig.name}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{desig.department}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{desig.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
          <BarChart className="h-4 w-4 text-blue-500" />
          Analytics
        </p>
        <div className="space-y-2">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Designation Distribution</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Salary Range Analysis</p>
        </div>
      </div>
    </div>
  );
}
