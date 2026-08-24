import { CalendarDays, Clock, Sun, Users } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

const leaveStats = [
  { 
    label: 'Applied Today', 
    value: '7', 
    icon: CalendarDays, 
    color: 'text-blue-600' 
  },
  { 
    label: 'Pending Approvals', 
    value: '12', 
    icon: Clock, 
    color: 'text-amber-600' 
  },
  { 
    label: 'On Leave Today', 
    value: '12', 
    icon: Sun, 
    color: 'text-purple-600' 
  },
  { 
    label: 'Team Available', 
    value: '88%', 
    icon: Users, 
    color: 'text-green-600' 
  },
];

const holidays = [
  { date: '15 Jan', name: 'Makar Sankranti' },
  { date: '26 Jan', name: 'Republic Day' },
];

export default function LeaveSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {leaveStats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
          >
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{s.value}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Card className="p-4">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Upcoming Holidays</h4>
        <div className="space-y-3">
          {holidays.map((h) => (
            <div key={h.name} className="flex items-center justify-between">
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{h.name}</span>
              <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{h.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
