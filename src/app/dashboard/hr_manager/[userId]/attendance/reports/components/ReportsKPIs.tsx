'use client';

import { CalendarDays, UserCheck, UserX, Briefcase, Timer, LogOut, Clock, Zap, LucideIcon } from 'lucide-react';
import { ReportRow } from './reportsData';

interface Props {
  rows: ReportRow[];
}

export default function ReportsKPIs({ rows }: Props) {
  const dates = new Set(rows.map((r) => r.date));
  const workingDays = dates.size;
  const present = rows.filter((r) => r.status === 'Present' || r.status === 'Late' || r.status === 'Early Out').length;
  const absent = rows.filter((r) => r.status === 'Absent').length;
  const leave = rows.filter((r) => r.status === 'Leave').length;
  const late = rows.filter((r) => r.status === 'Late').length;
  const earlyOut = rows.filter((r) => r.status === 'Early Out').length;
  const totalHours = rows.reduce((s, r) => s + r.totalHours, 0);
  const presentCount = present || 1;
  const avgHours = totalHours / presentCount;
  const overtime = rows.reduce((s, r) => s + r.overtimeHours, 0);

  const kpis: Array<{ label: string; value: string | number; icon: LucideIcon; color: string }> = [
    { label: 'Working Days', value: workingDays, icon: CalendarDays, color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' },
    { label: 'Total Present', value: present, icon: UserCheck, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { label: 'Total Absent', value: absent, icon: UserX, color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
    { label: 'Total Leaves', value: leave, icon: Briefcase, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { label: 'Total Late', value: late, icon: Timer, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    { label: 'Early Outs', value: earlyOut, icon: LogOut, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
    { label: 'Avg Working Hrs', value: avgHours.toFixed(1) + 'h', icon: Clock, color: 'bg-[#94cb3d]/10 text-[#94cb3d]' },
    { label: 'Overtime Hrs', value: overtime.toFixed(1) + 'h', icon: Zap, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {kpis.map((k) => {
        const Icon = k.icon;
        return (
          <div key={k.label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${k.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{k.label}</p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">{k.value}</p>
          </div>
        );
      })}
    </div>
  );
}
