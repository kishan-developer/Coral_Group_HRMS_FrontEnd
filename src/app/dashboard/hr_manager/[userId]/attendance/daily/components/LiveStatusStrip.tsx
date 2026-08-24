'use client';

import { useEffect, useState } from 'react';
import { LogIn, LogOut, Clock, Activity } from 'lucide-react';
import { DailyAttendanceRow } from './dailyData';

interface Props {
  rows: DailyAttendanceRow[];
}

const parseHM = (hm: string) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};

const formatHM = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
};

export default function LiveStatusStrip({ rows }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const currentlyIn = rows.filter((r) => r.inTime && !r.outTime).length;
  const currentlyOut = rows.filter((r) => r.inTime && r.outTime).length;

  let aggregateMinutes = 0;
  if (now) {
    const nowMins = now.getHours() * 60 + now.getMinutes();
    rows.forEach((r) => {
      if (!r.inTime) return;
      const inMins = parseHM(r.inTime);
      const outMins = r.outTime ? parseHM(r.outTime) : nowMins;
      aggregateMinutes += Math.max(0, outMins - inMins);
    });
  }

  const stats = [
    { label: 'Currently IN', value: currentlyIn, icon: LogIn, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'Currently OUT', value: currentlyOut, icon: LogOut, color: 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300' },
    { label: 'Total Working Hours (live)', value: now ? formatHM(aggregateMinutes) : '—', icon: Clock, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Now', value: now ? now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—', icon: Activity, color: 'text-[#94cb3d] bg-[#94cb3d]/10' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{s.label}</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
