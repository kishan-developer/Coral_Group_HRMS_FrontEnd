'use client';

import { useState } from 'react';
import { FileDown, FilesIcon, Calendar, Bell } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { DEPARTMENTS } from './reportsData';

interface Props {
  onBulkExport: (opts: { from: string; to: string; department: string }) => void;
  canBulk: boolean;
}

const today = () => new Date().toISOString().slice(0, 10);

export default function ExportCenter({ onBulkExport, canBulk }: Props) {
  const [from, setFrom] = useState(today());
  const [to, setTo] = useState(today());
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [scheduled, setScheduled] = useState(false);

  const base = 'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';
  const labelCls = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <FilesIcon className="h-4 w-4 text-zinc-500" />
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Export Center</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div>
          <label className={labelCls}>From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={base} />
        </div>
        <div>
          <label className={labelCls}>To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={base} />
        </div>
        <div>
          <label className={labelCls}>Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className={base}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <Button variant="primary" size="sm" onClick={() => onBulkExport({ from, to, department })} disabled={!canBulk}>
            <FileDown className="h-4 w-4" />
            Bulk PDF Export
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#94cb3d]/10 text-[#94cb3d]">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Automated Monthly Report</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Receive a consolidated PDF on the 1st of every month</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setScheduled((s) => !s)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scheduled ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-700'}`}
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${scheduled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      {scheduled && (
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          <Bell className="h-3 w-3 text-[#94cb3d]" />
          Scheduled — next run on 1st of next month.
        </p>
      )}
    </Card>
  );
}
