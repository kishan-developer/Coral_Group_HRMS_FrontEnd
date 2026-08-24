'use client';

import { Users, UserCheck, UserX, Briefcase, Timer, LogOut, HelpCircle, LucideIcon } from 'lucide-react';
import { DailyAttendanceRow, AttendanceStatus } from './dailyData';

interface Props {
  rows: DailyAttendanceRow[];
  activeStatus: AttendanceStatus | 'All';
  onStatusClick: (s: AttendanceStatus | 'All') => void;
}

interface MetricDef {
  key: AttendanceStatus | 'Total';
  label: string;
  icon: LucideIcon;
  color: string;
  active: string;
}

const METRICS: MetricDef[] = [
  { 
    key: 'Total', 
    label: 'Total Employees', 
    icon: Users, 
    color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300', 
    active: 'ring-zinc-400' 
  },
  { 
    key: 'Present', 
    label: 'Present', 
    icon: UserCheck, 
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', 
    active: 'ring-green-500' 
  },
  { 
    key: 'Absent', 
    label: 'Absent', 
    icon: UserX, 
    color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', 
    active: 'ring-red-500' 
  },
  { key: 'Leave', label: 'On Leave', icon: Briefcase, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', active: 'ring-blue-500' },
  { key: 'Late', label: 'Late In', icon: Timer, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', active: 'ring-amber-500' },
  { key: 'Early Out', label: 'Early Out', icon: LogOut, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', active: 'ring-orange-500' },
  { key: 'Not Marked', label: 'Not Marked', icon: HelpCircle, color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400', active: 'ring-zinc-500' },
];

export default function DailyMetricCards({ rows, activeStatus, onStatusClick }: Props) {
  const total = rows.length;
  const counts: Record<MetricDef['key'], number> = {
    Total: total,
    Present: rows.filter((r) => r.status === 'Present').length,
    Absent: rows.filter((r) => r.status === 'Absent').length,
    Leave: rows.filter((r) => r.status === 'Leave').length,
    Late: rows.filter((r) => r.status === 'Late').length,
    'Early Out': rows.filter((r) => r.status === 'Early Out').length,
    'Not Marked': rows.filter((r) => r.status === 'Not Marked').length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {METRICS.map((m) => {
        const count = counts[m.key];
        const pct = total > 0 ? ((count / total) * 100).toFixed(0) : '0';
        const Icon = m.icon;
        const isActive =
          (m.key === 'Total' && activeStatus === 'All') || (m.key !== 'Total' && activeStatus === m.key);
        const filterTarget: AttendanceStatus | 'All' = m.key === 'Total' ? 'All' : m.key;

        return (
          <button
            key={m.key}
            type="button"
            onClick={() => onStatusClick(filterTarget)}
            className={`text-left bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-[#94cb3d] hover:shadow-sm transition-all ${
              isActive ? `ring-2 ${m.active}` : ''
            }`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{m.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{count}</span>
              {m.key !== 'Total' && (
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{pct}%</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
