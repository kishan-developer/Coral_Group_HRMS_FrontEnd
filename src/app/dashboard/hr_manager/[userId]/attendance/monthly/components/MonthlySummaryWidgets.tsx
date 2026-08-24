'use client';

import { Calendar, Users, UserCheck, UserX, Timer, LogOut, Briefcase, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

interface Widget {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const widgets: Widget[] = [
  { title: 'Total Working Days', value: 22, trend: 'Standard month', trendUp: true, icon: Calendar, iconBg: 'bg-zinc-100 dark:bg-zinc-800', iconColor: 'text-zinc-600 dark:text-zinc-400' },
  { title: 'Total Employees', value: 218, trend: '+5 this month', trendUp: true, icon: Users, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { title: 'Avg. Present %', value: '92.5%', trend: '+2.3% vs last month', trendUp: true, icon: UserCheck, iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400' },
  { title: 'Avg. Absent %', value: '4.2%', trend: '-1.1% vs last month', trendUp: true, icon: UserX, iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
  { title: 'Avg. Late In %', value: '3.1%', trend: '+0.5% vs last month', trendUp: false, icon: Timer, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
  { title: 'Avg. Early Out %', value: '1.8%', trend: '-0.3% vs last month', trendUp: true, icon: LogOut, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
  { title: 'Casual Leave', value: 15, trend: '3 pending approval', trendUp: false, icon: Briefcase, iconBg: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400' },
  { title: 'Sick Leave', value: 8, trend: 'Within normal range', trendUp: true, icon: Briefcase, iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400' },
];

export default function MonthlySummaryWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        const TrendIcon = widget.trendUp ? TrendingUp : TrendingDown;
        return (
          <Card key={widget.title} className="p-4 hover:border-[#94cb3d] transition-colors">
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${widget.iconBg} ${widget.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${widget.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendIcon className="h-3 w-3" />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {widget.title}
            </p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {widget.value}
            </p>
            <p className={`mt-1 text-xs font-medium ${widget.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {widget.trend}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
