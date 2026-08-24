'use client';

import { Layers, CheckCircle2, PauseCircle, Users, LucideIcon } from 'lucide-react';
import { Shift } from './shiftsData';

interface Props {
  shifts: Shift[];
}

export default function ShiftsSummaryWidgets({ shifts }: Props) {
  const total = shifts.length;
  const active = shifts.filter((s) => s.status === 'Active').length;
  const inactive = total - active;
  const assigned = shifts.reduce((sum, s) => sum + s.assignedCount, 0);

  const widgets: Array<{ label: string; value: number; icon: LucideIcon; color: string }> = [
    { label: 'Total Shifts', value: total, icon: Layers, color: 'bg-[#94cb3d]/10 text-[#94cb3d]' },
    { label: 'Active Shifts', value: active, icon: CheckCircle2, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { label: 'Inactive Shifts', value: inactive, icon: PauseCircle, color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400' },
    { label: 'Employees Assigned', value: assigned, icon: Users, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((w) => {
        const Icon = w.icon;
        return (
          <div key={w.label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${w.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{w.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{w.value}</p>
          </div>
        );
      })}
    </div>
  );
}
