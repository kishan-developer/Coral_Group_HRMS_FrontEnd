'use client';

import { Calendar } from 'lucide-react';

export default function LeaveAnalytics() {
  const leaveTypes = [
    { name: 'Casual Leave', percentage: 45, color: 'bg-blue-500' },
    { name: 'Sick Leave', percentage: 30, color: 'bg-green-500' },
    { name: 'Earned Leave', percentage: 20, color: 'bg-purple-500' },
    { name: 'Unpaid Leave', percentage: 5, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-amber-500" />
        Leave Analytics
      </h2>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="45 100" strokeDashoffset="0" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-45" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="20 100" strokeDashoffset="-75" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 100" strokeDashoffset="-95" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        {leaveTypes.map((leave, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${leave.color}`} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{leave.name}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{leave.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
