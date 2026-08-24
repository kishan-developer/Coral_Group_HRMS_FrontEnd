'use client';

import { Calendar, X } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

export interface AttendanceFilterState {
  date: string;
  department: string;
  employee: string;
  shift: string;
}

interface AttendanceFiltersProps {
  value: AttendanceFilterState;
  onChange: (next: AttendanceFilterState) => void;
  onClear: () => void;
}

const departments = ['All Departments', 'Real Estate', 'Hotels', 'Saree Manufacturing', 'Corporate HO'];
const employees = ['All Employees', 'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Vikram Rao'];
const shifts = ['All Shifts', 'General (9:00 – 18:00)', 'Morning (6:00 – 14:00)', 'Evening (14:00 – 22:00)', 'Night (22:00 – 6:00)'];

export default function AttendanceFilters({ value, onChange, onClear }: AttendanceFiltersProps) {
  const set = <K extends keyof AttendanceFilterState>(key: K, v: AttendanceFilterState[K]) =>
    onChange({ ...value, [key]: v });

  const baseSelect =
    'rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';

  return (
    <div className="sticky top-[72px] z-30 bg-zinc-50/95 dark:bg-black/95 backdrop-blur border-y border-zinc-200 dark:border-zinc-800 -mx-6 px-6 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="date"
            value={value.date}
            onChange={(e) => set('date', e.target.value)}
            className={`${baseSelect} pl-9`}
          />
        </div>

        <select value={value.department} onChange={(e) => set('department', e.target.value)} className={baseSelect}>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select value={value.employee} onChange={(e) => set('employee', e.target.value)} className={baseSelect}>
          {employees.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <select value={value.shift} onChange={(e) => set('shift', e.target.value)} className={baseSelect}>
          {shifts.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
