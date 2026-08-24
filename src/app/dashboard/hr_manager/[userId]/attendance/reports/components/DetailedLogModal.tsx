'use client';

import Modal from '@/components/ui/Modal/Modal';
import Badge from '@/components/ui/Badge/Badge';
import { ReportRow, STATUS_BADGE } from './reportsData';

interface Props {
  row: ReportRow | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailedLogModal({ row, isOpen, onClose }: Props) {
  if (!row) return null;
  const items: Array<{ label: string; value: string | number | null }> = [
    { label: 'Employee', value: row.name },
    { label: 'Emp ID', value: row.empId },
    { label: 'Department', value: row.department },
    { label: 'Shift', value: row.shift },
    { label: 'Date', value: row.date },
    { label: 'Punch In', value: row.inTime ?? '—' },
    { label: 'Punch Out', value: row.outTime ?? '—' },
    { label: 'Total Hours', value: row.totalHours.toFixed(2) + 'h' },
    { label: 'Late', value: row.lateMinutes ? `${row.lateMinutes} min` : '—' },
    { label: 'Early Out', value: row.earlyOutMinutes ? `${row.earlyOutMinutes} min` : '—' },
    { label: 'Overtime', value: row.overtimeHours ? `${row.overtimeHours.toFixed(2)}h` : '—' },
    { label: 'Regularization', value: row.regularization },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detailed Attendance Log" className="max-w-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{row.name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{row.empId} · {row.department} · {row.date}</p>
        </div>
        <Badge variant={STATUS_BADGE[row.status]} size="md">{row.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it.label} className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2">
            <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase">{it.label}</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mt-0.5">{it.value ?? '—'}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
