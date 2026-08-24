'use client';

import { Building2, TrendingUp } from 'lucide-react';

export default function DepartmentMasterReport() {
  const departments = [
    { code: 'D001', name: 'Sales', head: 'John Doe', employees: 45 },
    { code: 'D002', name: 'HR', head: 'Jane Smith', employees: 12 },
    { code: 'D003', name: 'IT', head: 'Mike Johnson', employees: 30 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-green-500" />
        Department Master Report
      </h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Department Code</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Department Name</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Head</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Employees</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">{dept.code}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{dept.name}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{dept.head}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{dept.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          Analytics
        </p>
        <div className="space-y-2">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Department Wise Employee Count</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Department Growth</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Department Cost Analysis</p>
        </div>
      </div>
    </div>
  );
}
