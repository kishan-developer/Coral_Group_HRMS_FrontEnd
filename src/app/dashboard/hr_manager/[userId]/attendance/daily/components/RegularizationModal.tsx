'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { DailyAttendanceRow } from './dailyData';

interface Props {
  row: DailyAttendanceRow | null;
  isOpen: boolean;
  onClose: () => void;
  onDecision: (rowId: string, decision: 'approved' | 'rejected') => void;
}

export default function RegularizationModal({ row, isOpen, onClose, onDecision }: Props) {
  const [proposedIn, setProposedIn] = useState('09:00');
  const [proposedOut, setProposedOut] = useState('18:00');

  if (!row) return null;

  const handle = (decision: 'approved' | 'rejected') => {
    onDecision(row.id, decision);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Regularization Request">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Request Type</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">Missing Punch</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Requested By</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">{row.name} ({row.empId})</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Reason</p>
            <p className="text-zinc-700 dark:text-zinc-300">{row.regularizationReason ?? 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Recorded In</p>
            <p className="font-mono text-zinc-900 dark:text-zinc-50">{row.inTime ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Recorded Out</p>
            <p className="font-mono text-zinc-900 dark:text-zinc-50">{row.outTime ?? '—'}</p>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">Proposed Time</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Proposed In</label>
              <input
                type="time"
                value={proposedIn}
                onChange={(e) => setProposedIn(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Proposed Out</label>
              <input
                type="time"
                value={proposedOut}
                onChange={(e) => setProposedOut(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <Button variant="danger" size="sm" onClick={() => handle('rejected')}>
            <X className="h-4 w-4" />
            Reject
          </Button>
          <Button variant="primary" size="sm" onClick={() => handle('approved')}>
            <Check className="h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
}
