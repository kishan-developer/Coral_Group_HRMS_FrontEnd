'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { DailyAttendanceRow, AttendanceStatus } from './dailyData';

interface Props {
  row: DailyAttendanceRow | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, patch: Partial<DailyAttendanceRow>) => void;
}

const STATUSES: AttendanceStatus[] = ['Present', 'Absent', 'Leave', 'Late', 'Early Out', 'Not Marked'];

export default function EditAttendanceModal({ row, isOpen, onClose, onSave }: Props) {
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('Present');

  useEffect(() => {
    if (row) {
      setInTime(row.inTime ?? '');
      setOutTime(row.outTime ?? '');
      setStatus(row.status);
    }
  }, [row]);

  if (!row) return null;

  const baseInput =
    'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(row.id, {
      inTime: inTime || null,
      outTime: outTime || null,
      status,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Attendance — ${row.name}`}>
      <form onSubmit={submit} className="space-y-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {row.empId} · {row.department} · {row.shift} ({row.shiftStart} – {row.shiftEnd})
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">In Time</label>
            <input type="time" value={inTime} onChange={(e) => setInTime(e.target.value)} className={baseInput} />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Out Time</label>
            <input type="time" value={outTime} onChange={(e) => setOutTime(e.target.value)} className={baseInput} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as AttendanceStatus)} className={baseInput}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
