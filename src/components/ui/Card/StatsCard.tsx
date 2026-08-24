import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trendUp ? 'text-green-600' : 'text-red-600')}>
              {trendUp ? '+' : ''}{trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#94cb3d]/10 text-[#94cb3d]">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
