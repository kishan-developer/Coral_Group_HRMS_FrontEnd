'use client';

import { AlertTriangle, UserMinus, Clock } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import { Shift } from './shiftsData';

interface Props {
  shifts: Shift[];
}

const parseHM = (hm: string) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};

const totalMinutes = (s: Shift) => {
  let e = parseHM(s.endTime);
  const st = parseHM(s.startTime);
  if (e <= st) e += 24 * 60;
  return Math.max(0, e - st - s.breakMinutes);
};

export default function ShiftAlerts({ shifts }: Props) {
  const overlaps: Array<{ a: Shift; b: Shift }> = [];
  const sorted = [...shifts].filter((s) => s.status === 'Active').sort((a, b) => parseHM(a.startTime) - parseHM(b.startTime));
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const a = sorted[i], b = sorted[j];
      if (a.type === 'Rotational' && b.type === 'Rotational') continue;
      const aStart = parseHM(a.startTime);
      let aEnd = parseHM(a.endTime); if (aEnd <= aStart) aEnd += 24 * 60;
      const bStart = parseHM(b.startTime);
      let bEnd = parseHM(b.endTime); if (bEnd <= bStart) bEnd += 24 * 60;
      const overlap = Math.min(aEnd, bEnd) - Math.max(aStart, bStart);
      if (overlap > 60) overlaps.push({ a, b });
    }
  }

  const missing = shifts.filter((s) => s.status === 'Active' && s.assignedCount === 0);
  const exceeding = shifts.filter((s) => totalMinutes(s) > 9 * 60);

  const sections = [
    {
      title: 'Overlapping Shifts',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
      items: overlaps.map((o) => `${o.a.name} (${o.a.startTime}–${o.a.endTime}) overlaps ${o.b.name} (${o.b.startTime}–${o.b.endTime})`),
      empty: 'No overlapping shifts detected.',
    },
    {
      title: 'Shifts Without Assignment',
      icon: UserMinus,
      color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
      items: missing.map((s) => `${s.name} (${s.code}) has 0 employees`),
      empty: 'All active shifts have at least one assignment.',
    },
    {
      title: 'Shifts Exceeding 9h Daily Limit',
      icon: Clock,
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400',
      items: exceeding.map((s) => `${s.name} — ${s.workingHours} working hours`),
      empty: 'No shifts exceed the daily working-hour limit.',
    },
  ];

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Shift Alerts & Rules</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Automatic checks across all active shifts</p>
      </div>
      <div className="space-y-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.title}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${sec.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{sec.title}</p>
                </div>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{sec.items.length}</span>
              </div>
              {sec.items.length === 0 ? (
                <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-9">{sec.empty}</p>
              ) : (
                <ul className="space-y-1 pl-9">
                  {sec.items.slice(0, 5).map((t, i) => (
                    <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300">{t}</li>
                  ))}
                  {sec.items.length > 5 && <li className="text-[11px] text-zinc-400 italic">+{sec.items.length - 5} more</li>}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
