'use client';

import { Calendar, TrendingUp, Clock, UserCheck } from 'lucide-react';

export default function LeaveAnalyticsSidebar() {
  const analytics = [
    { icon: Calendar, label: 'Leaves Taken This Month', value: '5 days', color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Leaves Taken This Year', value: '18 days', color: 'text-green-500' },
    { icon: UserCheck, label: 'Attendance %', value: '94.5%', color: 'text-purple-500' },
    { icon: Clock, label: 'Late Arrivals', value: '3 times', color: 'text-amber-500' },
    { icon: Calendar, label: 'Work Days', value: '220 days', color: 'text-teal-500' },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Employee Leave Statistics</h3>
      <div className="space-y-4">
        {analytics.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
