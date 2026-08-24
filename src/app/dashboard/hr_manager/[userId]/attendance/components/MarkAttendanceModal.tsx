'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarkAttendanceModal({ isOpen, onClose }: Props) {
  const [employee, setEmployee] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [punchIn, setPunchIn] = useState('09:00');
  const [punchOut, setPunchOut] = useState('18:00');
  const [status, setStatus] = useState<'Present' | 'Late' | 'Half Day' | 'Absent'>('Present');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const baseInput =
    'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Attendance">
      {saved ? (
        <div className="py-8 flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Attendance recorded</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Employee</label>
            <input required value={employee} onChange={(e) => setEmployee(e.target.value)} className={baseInput} placeholder="Search by name or ID" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={baseInput} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={baseInput}>
                <option>Present</option>
                <option>Late</option>
                <option>Half Day</option>
                <option>Absent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Punch In</label>
              <input type="time" value={punchIn} onChange={(e) => setPunchIn(e.target.value)} className={baseInput} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Punch Out</label>
              <input type="time" value={punchOut} onChange={(e) => setPunchOut(e.target.value)} className={baseInput} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Note (optional)</label>
            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} className={baseInput} placeholder="Reason / remark" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Attendance</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
