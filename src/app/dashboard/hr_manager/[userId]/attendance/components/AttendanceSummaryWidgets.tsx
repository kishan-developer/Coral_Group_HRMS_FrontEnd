import Link from 'next/link';
import { UserCheck, UserX, Briefcase, Timer, LogOut, ArrowUpRight, LucideIcon } from 'lucide-react';

interface Widget {
  title: string;
  count: number;
  trend: string;
  trendUp: boolean;
  href: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const widgets: Widget[] = [
  { title: 'Total Present', count: 198, trend: '+5 vs yesterday', trendUp: true, href: '/dashboard/admin/attendance/daily?status=present', icon: UserCheck, iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400' },
  { title: 'Total Absent', count: 8, trend: '-2 vs yesterday', trendUp: true, href: '/dashboard/admin/attendance/daily?status=absent', icon: UserX, iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
  { title: 'Total Leave', count: 12, trend: '+1 vs yesterday', trendUp: false, href: '/dashboard/admin/leave/requests', icon: Briefcase, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { title: 'Late Comers', count: 5, trend: '+1 vs yesterday', trendUp: false, href: '/dashboard/admin/attendance/daily?status=late', icon: Timer, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
  { title: 'Early Outs', count: 3, trend: '0 vs yesterday', trendUp: true, href: '/dashboard/admin/attendance/daily?status=early-out', icon: LogOut, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
];

export default function AttendanceSummaryWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {widgets.map((w) => {
        const Icon = w.icon;
        return (
          <Link
            key={w.title}
            href={w.href}
            className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-[#94cb3d] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${w.iconBg} ${w.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{w.title}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{w.count}</p>
            <p className={`mt-1 text-xs font-medium ${w.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {w.trend}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
