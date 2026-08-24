'use client';

import { Clock, PieChart } from 'lucide-react';

export default function ShiftMasterReport() {
  const shifts = [
    { name: 'Morning Shift', startTime: '09:00', endTime: '18:00', employees: 150 },
    { name: 'Night Shift', startTime: '20:00', endTime: '05:00', employees: 50 },
    { name: 'General Shift', startTime: '10:00', endTime: '19:00', employees: 50 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-amber-500" />
        Shift Master Report
      </h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Shift Name</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Start Time</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">End Time</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Employees</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 px-3 text-xs text-zinc-900 dark:text-zinc-100">{shift.name}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{shift.startTime}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{shift.endTime}</td>
                <td className="py-2 px-3 text-xs text-zinc-600 dark:text-zinc-400">{shift.employees}</td>
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
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Shift Utilization</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">• Shift Distribution</p>
        </div>
      </div>
    </div>
  );
}
