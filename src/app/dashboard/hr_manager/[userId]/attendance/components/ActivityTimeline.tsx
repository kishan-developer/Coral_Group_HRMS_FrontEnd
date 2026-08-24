import { LogIn, LogOut, Coffee, ClipboardCheck, RefreshCw, LucideIcon } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

type ActivityType = 'punch-in' | 'punch-out' | 'break' | 'regularization' | 'shift-change';

interface Activity {
  id: number;
  type: ActivityType;
  name: string;
  message: string;
  time: string;
}

const activities: Activity[] = [
  { id: 1, type: 'punch-in', name: 'Rahul Sharma', message: 'punched in at the Real Estate office', time: '2 min ago' },
  { id: 2, type: 'break', name: 'Vikram Rao', message: 'started a tea break', time: '6 min ago' },
  { id: 3, type: 'regularization', name: 'Sneha Gupta', message: 'requested attendance regularization for May 9', time: '12 min ago' },
  { id: 4, type: 'punch-in', name: 'Priya Patel', message: 'punched in at the Hotels branch', time: '24 min ago' },
  { id: 5, type: 'shift-change', name: 'Neha Desai', message: 'shift changed to Morning effective May 12', time: '38 min ago' },
  { id: 6, type: 'punch-out', name: 'Anita Joshi', message: 'punched out from Corporate HO', time: '1h ago' },
  { id: 7, type: 'punch-in', name: 'Rajesh Mehta', message: 'punched in late at Saree Manufacturing', time: '1h 22m ago' },
];

const typeConfig: Record<ActivityType, { icon: LucideIcon; color: string }> = {
  'punch-in': { icon: LogIn, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
  'punch-out': { icon: LogOut, color: 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300' },
  break: { icon: Coffee, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
  regularization: { icon: ClipboardCheck, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' },
  'shift-change': { icon: RefreshCw, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' },
};

export default function ActivityTimeline() {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Activity Timeline</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Today&apos;s attendance events</p>
      </div>

      <div className="relative">
        <span className="absolute left-[18px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />
        <ul className="space-y-4">
          {activities.map((a) => {
            const cfg = typeConfig[a.type];
            const Icon = cfg.icon;
            return (
              <li key={a.id} className="relative flex gap-3">
                <div className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-white dark:ring-zinc-900 ${cfg.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-zinc-900 dark:text-zinc-50">
                    <span className="font-semibold">{a.name}</span>{' '}
                    <span className="text-zinc-600 dark:text-zinc-400">{a.message}</span>
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{a.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
