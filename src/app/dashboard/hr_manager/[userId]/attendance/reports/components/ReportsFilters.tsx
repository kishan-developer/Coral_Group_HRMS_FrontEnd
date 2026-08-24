'use client';

import { Filter, RotateCcw, Check, FileSpreadsheet, FileText, Download } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import { DEPARTMENTS, EMPLOYEE_NAMES, SHIFTS, STATUSES, ReportStatus } from './reportsData';

export interface ReportsFilterState {
  from: string;
  to: string;
  department: string;
  employee: string;
  shift: string;
  status: ReportStatus | 'All';
}

const today = () => new Date().toISOString().slice(0, 10);
const fourteenAgo = () => {
  const d = new Date();
  d.setDate(d.getDate() - 13);
  return d.toISOString().slice(0, 10);
};

export const DEFAULT_REPORTS_FILTERS: ReportsFilterState = {
  from: fourteenAgo(),
  to: today(),
  department: 'All Departments',
  employee: 'All Employees',
  shift: 'All Shifts',
  status: 'All',
};

interface Props {
  draft: ReportsFilterState;
  onDraftChange: (next: ReportsFilterState) => void;
  onApply: () => void;
  onReset: () => void;
  onExportCSV: () => void;
  onExportXLS: () => void;
  onExportPDF: () => void;
}

export default function ReportsFilters({ draft, onDraftChange, onApply, onReset, onExportCSV, onExportXLS, onExportPDF }: Props) {
  const set = <K extends keyof ReportsFilterState>(k: K, v: ReportsFilterState[K]) =>
    onDraftChange({ ...draft, [k]: v });
  const base = 'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';
  const labelCls = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Filters & Export</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onExportCSV}><FileSpreadsheet className="h-4 w-4" />CSV</Button>
          <Button variant="secondary" size="sm" onClick={onExportXLS}><Download className="h-4 w-4" />XLS</Button>
          <Button variant="primary" size="sm" onClick={onExportPDF}><FileText className="h-4 w-4" />PDF</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div>
          <label className={labelCls}>From</label>
          <input type="date" value={draft.from} onChange={(e) => set('from', e.target.value)} className={base} />
        </div>
        <div>
          <label className={labelCls}>To</label>
          <input type="date" value={draft.to} onChange={(e) => set('to', e.target.value)} className={base} />
        </div>
        <div>
          <label className={labelCls}>Department</label>
          <select value={draft.department} onChange={(e) => set('department', e.target.value)} className={base}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Employee</label>
          <select value={draft.employee} onChange={(e) => set('employee', e.target.value)} className={base}>
            {EMPLOYEE_NAMES.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Shift</label>
          <select value={draft.shift} onChange={(e) => set('shift', e.target.value)} className={base}>
            {SHIFTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={draft.status} onChange={(e) => set('status', e.target.value as ReportsFilterState['status'])} className={base}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" size="sm" onClick={onReset}><RotateCcw className="h-4 w-4" />Reset</Button>
        <Button variant="primary" size="sm" onClick={onApply}><Check className="h-4 w-4" />Apply</Button>
      </div>
    </Card>
  );
}
