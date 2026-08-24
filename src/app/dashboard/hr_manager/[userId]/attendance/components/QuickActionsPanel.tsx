'use client';

import Link from 'next/link';
import { CheckSquare, ClipboardCheck, FileClock, CalendarPlus, Download, LucideIcon } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

interface Action {
  label: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  href?: string;
  onClick?: () => void;
}

interface Props {
  onMarkAttendance: () => void;
  onDownloadReport: () => void;
}

export default function QuickActionsPanel({ onMarkAttendance, onDownloadReport }: Props) {
  const actions: Action[] = [
    { label: 'Mark Attendance', desc: 'Manual punch entry', icon: CheckSquare, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400', onClick: onMarkAttendance },
    { label: 'Approve Requests', desc: 'Regularization & missed punch', href: '/dashboard/admin/attendance/regularization', icon: ClipboardCheck, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' },
    { label: 'View Logs', desc: 'Full punch history', href: '/dashboard/admin/reports/staff-log', icon: FileClock, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Add Leave', desc: 'Apply leave for employee', href: '/dashboard/admin/leave/requests', icon: CalendarPlus, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' },
    { label: 'Download Report', desc: 'Export Excel / PDF', icon: Download, color: 'text-zinc-700 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300', onClick: onDownloadReport },
  ];

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Quick Actions</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Frequently used admin tasks</p>
      </div>
      <div className="space-y-2">
        {actions.map((a) => {
          const Icon = a.icon;
          const inner = (
            <>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-[#94cb3d] transition-colors">
                  {a.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{a.desc}</p>
              </div>
            </>
          );
          const classes = 'w-full flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-[#94cb3d] hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group';
          if (a.href) {
            return (
              <Link key={a.label} href={a.href} className={classes}>
                {inner}
              </Link>
            );
          }
          return (
            <button key={a.label} type="button" onClick={a.onClick} className={classes}>
              {inner}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
