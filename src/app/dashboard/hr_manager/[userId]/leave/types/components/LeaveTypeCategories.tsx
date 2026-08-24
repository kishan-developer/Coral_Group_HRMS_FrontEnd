'use client';

import { DollarSign, FileText, Home, Clock } from 'lucide-react';

export default function LeaveTypeCategories() {
  const categories = [
    {
      title: 'Paid Leaves',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      leaves: ['Casual Leave', 'Paternity Leave'],
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Leave Type Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${category.bgColor} p-2 rounded-lg`}>
                <category.icon className={`h-5 w-5 ${category.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.leaves.map((leave, leaveIndex) => (
                <li key={leaveIndex} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  {leave}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
