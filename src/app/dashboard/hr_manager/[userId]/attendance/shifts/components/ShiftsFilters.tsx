'use client';

import { Filter, RotateCcw, Check } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import { DEPARTMENTS, SHIFT_TYPES, STATUS_OPTIONS, ShiftStatus, ShiftType } from './shiftsData';

export interface ShiftsFilterState {
  department: string;
  type: ShiftType | 'All Types';
  status: ShiftStatus | 'All';
  fromTime: string;
  toTime: string;
}

export const DEFAULT_SHIFTS_FILTERS: ShiftsFilterState = {
  department: 'All Departments',
  type: 'All Types',
  status: 'All',
  fromTime: '',
  toTime: '',
};

interface Props {
  draft: ShiftsFilterState;
  onDraftChange: (next: ShiftsFilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function ShiftsFilters({ draft, onDraftChange, onApply, onReset }: Props) {
  const set = <K extends keyof ShiftsFilterState>(k: K, v: ShiftsFilterState[K]) =>
    onDraftChange({ ...draft, [k]: v });

  const base = 'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-zinc-500" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Filters</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Department</label>
          <select className={base} value={draft.department} onChange={(e) => set('department', e.target.value)}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Shift Type</label>
          <select className={base} value={draft.type} onChange={(e) => set('type', e.target.value as ShiftsFilterState['type'])}>
            {SHIFT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
          <select className={base} value={draft.status} onChange={(e) => set('status', e.target.value as ShiftsFilterState['status'])}>
            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Starts From</label>
          <input type="time" className={base} value={draft.fromTime} onChange={(e) => set('fromTime', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Ends By</label>
          <input type="time" className={base} value={draft.toTime} onChange={(e) => set('toTime', e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={onApply}>
          <Check className="h-4 w-4" />
          Apply
        </Button>
      </div>
    </Card>
  );
}
