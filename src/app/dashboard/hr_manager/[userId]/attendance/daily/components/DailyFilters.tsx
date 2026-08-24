'use client';

import { Filter, RotateCcw, Check } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import { DEPARTMENTS, EMPLOYEES, SHIFTS, STATUSES, EMPLOYMENT_TYPES, AttendanceStatus } from './dailyData';

export interface DailyFilterState {
  department: string;
  employee: string;
  shift: string;
  status: AttendanceStatus | 'All';
  employmentType: string;
}

export const DEFAULT_DAILY_FILTERS: DailyFilterState = {
  department: 'All Departments',
  employee: 'All Employees',
  shift: 'All Shifts',
  status: 'All',
  employmentType: 'All Types',
};

interface Props {
  draft: DailyFilterState;
  onDraftChange: (next: DailyFilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function DailyFilters({ draft, onDraftChange, onApply, onReset }: Props) {
  const set = <K extends keyof DailyFilterState>(key: K, v: DailyFilterState[K]) =>
    onDraftChange({ ...draft, [key]: v });

  const baseSelect =
    'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-zinc-500" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Filters</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Department</label>
          <select className={baseSelect} value={draft.department} onChange={(e) => set('department', e.target.value)}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Employee</label>
          <select className={baseSelect} value={draft.employee} onChange={(e) => set('employee', e.target.value)}>
            {EMPLOYEES.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Shift</label>
          <select className={baseSelect} value={draft.shift} onChange={(e) => set('shift', e.target.value)}>
            {SHIFTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
          <select className={baseSelect} value={draft.status} onChange={(e) => set('status', e.target.value as DailyFilterState['status'])}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Employment Type</label>
          <select className={baseSelect} value={draft.employmentType} onChange={(e) => set('employmentType', e.target.value)}>
            {EMPLOYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={onApply}>
          <Check className="h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}
