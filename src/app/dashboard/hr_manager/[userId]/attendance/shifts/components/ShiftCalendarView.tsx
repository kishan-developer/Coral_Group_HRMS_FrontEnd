'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card/Card';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { Shift, ShiftAssignment } from './shiftsData';

interface Props {
  shifts: Shift[];
  assignments: ShiftAssignment[];
}

const SHIFT_COLORS = ['#94cb3d', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#ec4899', '#10b981'];

const startOfWeek = (d: Date) => {
  const day = d.getDay();
  const diff = (day + 6) % 7; // Monday-first
  const r = new Date(d);
  r.setDate(d.getDate() - diff);
  r.setHours(0, 0, 0, 0);
  return r;
};

export default function ShiftCalendarView({ shifts, assignments }: Props) {
  const [mode, setMode] = useState<'week' | 'month'>('week');
  const [anchor, setAnchor] = useState<Date>(() => new Date());

  const shiftColor = useMemo(() => {
    const m = new Map<string, string>();
    shifts.forEach((s, i) => m.set(s.id, SHIFT_COLORS[i % SHIFT_COLORS.length]));
    return m;
  }, [shifts]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [anchor]);

  const monthDays = useMemo(() => {
    if (mode !== 'month') return [];
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const last = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const start = startOfWeek(first);
    const days: Date[] = [];
    const cur = new Date(start);
    while (cur <= last || days.length % 7 !== 0) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
      if (days.length > 42) break;
    }
    return days;
  }, [anchor, mode]);

  const shift = (days: number) => {
    const d = new Date(anchor);
    if (mode === 'week') d.setDate(d.getDate() + days * 7);
    else d.setMonth(d.getMonth() + days);
    setAnchor(d);
  };

  const label = mode === 'week'
    ? `${weekDays[0].toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} – ${weekDays[6].toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`
    : anchor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const assignmentsForDate = (d: Date) => {
    const iso = d.toISOString().slice(0, 10);
    return assignments.filter((a) => {
      if (a.effectiveFrom > iso) return false;
      if (a.effectiveTo && a.effectiveTo < iso) return false;
      return true;
    });
  };

  const today = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-zinc-500" />
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Shift Calendar</h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">· {label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden">
            <button onClick={() => setMode('week')} className={`px-3 py-1.5 text-xs font-medium ${mode === 'week' ? 'bg-[#94cb3d] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}>Week</button>
            <button onClick={() => setMode('month')} className={`px-3 py-1.5 text-xs font-medium border-l border-zinc-300 dark:border-zinc-700 ${mode === 'month' ? 'bg-[#94cb3d] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}>Month</button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => shift(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="secondary" size="sm" onClick={() => setAnchor(new Date())}>Today</Button>
          <Button variant="ghost" size="sm" onClick={() => shift(1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
        {headers.map((h) => <div key={h} className="px-2 py-1">{h}</div>)}
      </div>

      {mode === 'week' ? (
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d) => {
            const list = assignmentsForDate(d);
            const isToday = isSameDay(d, today);
            return (
              <div key={d.toISOString()} className={`min-h-[160px] rounded-lg border p-2 ${isToday ? 'border-[#94cb3d] bg-[#94cb3d]/5' : 'border-zinc-200 dark:border-zinc-800'}`}>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">{d.getDate()}</p>
                <div className="space-y-1">
                  {list.slice(0, 5).map((a) => {
                    const s = shifts.find((x) => x.id === a.shiftId);
                    if (!s) return null;
                    return (
                      <div key={a.id} className="px-1.5 py-1 rounded text-[10px] font-medium truncate text-white" style={{ background: shiftColor.get(s.id) }} title={`${a.empName} · ${s.name}`}>
                        {a.empName} · {s.code}
                      </div>
                    );
                  })}
                  {list.length > 5 && <p className="text-[10px] text-zinc-500">+{list.length - 5} more</p>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((d) => {
            const inMonth = d.getMonth() === anchor.getMonth();
            const list = assignmentsForDate(d);
            const isToday = isSameDay(d, today);
            return (
              <div key={d.toISOString()} className={`min-h-[90px] rounded-lg border p-1.5 ${isToday ? 'border-[#94cb3d] bg-[#94cb3d]/5' : 'border-zinc-200 dark:border-zinc-800'} ${!inMonth ? 'opacity-40' : ''}`}>
                <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">{d.getDate()}</p>
                <div className="mt-1 flex flex-wrap gap-0.5">
                  {Array.from(new Set(list.map((a) => a.shiftId))).slice(0, 4).map((sid) => (
                    <span key={sid} className="h-1.5 w-1.5 rounded-full" style={{ background: shiftColor.get(sid) }} />
                  ))}
                  {list.length > 0 && <span className="text-[9px] text-zinc-500 dark:text-zinc-400 ml-1">{list.length}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {shifts.slice(0, 6).map((s) => (
          <span key={s.id} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: shiftColor.get(s.id) }} />
            {s.name}
          </span>
        ))}
      </div>
    </Card>
  );
}
