'use client';

import Modal from '@/components/ui/Modal/Modal';
import { Trash2, ArrowRightLeft } from 'lucide-react';
import { Shift, ShiftAssignment } from './shiftsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  shift: Shift | null;
  assignments: ShiftAssignment[];
  onRemove: (assignmentId: string) => void;
  onChangeShift: (assignmentId: string) => void;
}

export default function AssignedEmployeesModal({ isOpen, onClose, shift, assignments, onRemove, onChangeShift }: Props) {
  if (!shift) return null;
  const rows = assignments.filter((a) => a.shiftId === shift.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assigned Employees — ${shift.name}`} className="max-w-3xl">
      <div className="space-y-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {shift.code} · {shift.startTime} – {shift.endTime} · {rows.length} assignments
        </div>

        <div className="overflow-x-auto max-h-[420px] overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Employee</th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Emp ID</th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Department</th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">From</th>
                <th className="px-4 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">To</th>
                <th className="px-4 py-2 text-right text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-50">{a.empName}</td>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">{a.empId}</td>
                  <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{a.department}</td>
                  <td className="px-4 py-2 font-mono text-xs">{a.effectiveFrom}</td>
                  <td className="px-4 py-2 font-mono text-xs">{a.effectiveTo ?? <span className="text-zinc-400">—</span>}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-1">
                      <button type="button" title="Change Shift" onClick={() => onChangeShift(a.id)} className="p-1.5 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <ArrowRightLeft className="h-4 w-4" />
                      </button>
                      <button type="button" title="Remove" onClick={() => onRemove(a.id)} className="p-1.5 rounded-md text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">No employees assigned to this shift yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
