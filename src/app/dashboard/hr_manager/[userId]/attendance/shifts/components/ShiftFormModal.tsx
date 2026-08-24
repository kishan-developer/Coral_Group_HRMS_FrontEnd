'use client';

import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { Shift, ShiftType, WeekDay, WEEK_DAYS, calcWorkingHours } from './shiftsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editing: Shift | null;
  onSave: (data: Omit<Shift, 'id' | 'assignedCount' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt' | 'workingHours'> & { workingHours: string }) => void;
}

const TYPES: ShiftType[] = ['General', 'Night', 'Rotational', 'Split'];

interface FormState {
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  type: ShiftType;
  allowedLateMinutes: number;
  allowedEarlyOutMinutes: number;
  weeklyOff: WeekDay[];
  notes: string;
  status: Shift['status'];
}

const empty: FormState = {
  name: '',
  code: '',
  startTime: '09:00',
  endTime: '18:00',
  breakMinutes: 60,
  type: 'General',
  allowedLateMinutes: 15,
  allowedEarlyOutMinutes: 10,
  weeklyOff: ['Sun'],
  notes: '',
  status: 'Active',
};

export default function ShiftFormModal({ isOpen, onClose, editing, onSave }: Props) {
  const [form, setForm] = useState<FormState>(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        code: editing.code,
        startTime: editing.startTime,
        endTime: editing.endTime,
        breakMinutes: editing.breakMinutes,
        type: editing.type,
        allowedLateMinutes: editing.allowedLateMinutes,
        allowedEarlyOutMinutes: editing.allowedEarlyOutMinutes,
        weeklyOff: editing.weeklyOff,
        notes: editing.notes ?? '',
        status: editing.status,
      });
    } else {
      setForm(empty);
    }
  }, [editing, isOpen]);

  const workingHours = useMemo(
    () => calcWorkingHours(form.startTime, form.endTime, form.breakMinutes),
    [form.startTime, form.endTime, form.breakMinutes]
  );

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const toggleDay = (d: WeekDay) =>
    set('weeklyOff', form.weeklyOff.includes(d) ? form.weeklyOff.filter((x) => x !== d) : [...form.weeklyOff, d]);

  const base = 'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';
  const labelCls = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, workingHours });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Shift' : 'Add New Shift'} className="max-w-2xl">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Shift Name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={base} placeholder="e.g. General Day" />
          </div>
          <div>
            <label className={labelCls}>Shift Code *</label>
            <input required value={form.code} onChange={(e) => set('code', e.target.value.toUpperCase())} className={base} placeholder="e.g. GEN-D" />
          </div>
          <div>
            <label className={labelCls}>Start Time *</label>
            <input type="time" required value={form.startTime} onChange={(e) => set('startTime', e.target.value)} className={base} />
          </div>
          <div>
            <label className={labelCls}>End Time *</label>
            <input type="time" required value={form.endTime} onChange={(e) => set('endTime', e.target.value)} className={base} />
          </div>
          <div>
            <label className={labelCls}>Break Duration (mins)</label>
            <input type="number" min={0} value={form.breakMinutes} onChange={(e) => set('breakMinutes', Number(e.target.value))} className={base} />
          </div>
          <div>
            <label className={labelCls}>Total Working Hours</label>
            <input readOnly value={workingHours} className={`${base} bg-zinc-50 dark:bg-zinc-800/60 cursor-not-allowed`} />
          </div>
          <div>
            <label className={labelCls}>Shift Type</label>
            <select value={form.type} onChange={(e) => set('type', e.target.value as ShiftType)} className={base}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value as FormState['status'])} className={base}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Allowed Late (mins)</label>
            <input type="number" min={0} value={form.allowedLateMinutes} onChange={(e) => set('allowedLateMinutes', Number(e.target.value))} className={base} />
          </div>
          <div>
            <label className={labelCls}>Allowed Early Out (mins)</label>
            <input type="number" min={0} value={form.allowedEarlyOutMinutes} onChange={(e) => set('allowedEarlyOutMinutes', Number(e.target.value))} className={base} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Weekly Off</label>
          <div className="flex flex-wrap gap-2">
            {WEEK_DAYS.map((d) => {
              const on = form.weeklyOff.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    on
                      ? 'bg-[#94cb3d] border-[#94cb3d] text-white'
                      : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelCls}>Notes</label>
          <textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)} className={base} placeholder="Optional remarks or schedule details" />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm">{editing ? 'Save Changes' : 'Create Shift'}</Button>
        </div>
      </form>
    </Modal>
  );
}
