'use client';

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

interface Props {
  date: string; // YYYY-MM-DD
  onDateChange: (d: string) => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const shift = (d: string, days: number) => {
  const dt = new Date(d + 'T00:00:00');
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().slice(0, 10);
};

const pretty = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

export default function DailyHeader({ date, onDateChange }: Props) {
  const isToday = date === today();
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Daily Attendance</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{pretty(date)}{isToday && ' · Today'}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => onDateChange(shift(date, -1))}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant={isToday ? 'primary' : 'secondary'} size="sm" onClick={() => onDateChange(today())}>
          Today
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDateChange(shift(date, 1))}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-3 py-1.5 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          />
        </div>
      </div>
    </div>
  );
}
