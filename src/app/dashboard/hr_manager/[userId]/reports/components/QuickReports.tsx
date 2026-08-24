'use client';

import { Zap, Clock, DollarSign, Calendar, Users, Building2, TrendingUp } from 'lucide-react';

export default function QuickReports() {
  const quickReports = [
    { name: "Today's Attendance", icon: Clock, color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Monthly Payroll', icon: DollarSign, color: 'bg-emerald-500 hover:bg-emerald-600' },
    { name: 'Leave Summary', icon: Calendar, color: 'bg-amber-500 hover:bg-amber-600' },
    { name: 'Employee Directory', icon: Users, color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Department Summary', icon: Building2, color: 'bg-teal-500 hover:bg-teal-600' },
    { name: 'Performance Overview', icon: TrendingUp, color: 'bg-indigo-500 hover:bg-indigo-600' },
  ];

  const handleQuickReport = (reportName: string) => {
    alert(`Generating ${reportName}...`);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            Quick One-Click Reports
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Instant PDF & Excel generation for core HR datasets
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {quickReports.map((report, index) => {
          const Icon = report.icon;
          return (
            <button
              key={index}
              onClick={() => handleQuickReport(report.name)}
              className={`${report.color} p-4 rounded-xl text-white text-center transition-all duration-150 shadow-sm flex flex-col items-center justify-center gap-2.5`}
            >
              <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold leading-tight">{report.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
