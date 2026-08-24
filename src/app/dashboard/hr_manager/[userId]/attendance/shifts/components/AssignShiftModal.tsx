'use client';

import { useMemo, useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { Search, Check } from 'lucide-react';
import { DEPARTMENTS, SAMPLE_EMPLOYEES, Shift } from './shiftsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  shifts: Shift[];
  onAssign: (payload: { shiftId: string; empIds: string[]; effectiveFrom: string; effectiveTo: string }) => void;
}

export default function AssignShiftModal({ isOpen, onClose, shifts, onAssign }: Props) {
  const activeShifts = shifts.filter((s) => s.status === 'Active');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [shiftId, setShiftId] = useState(activeShifts[0]?.id ?? '');
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const employees = useMemo(() => {
    return SAMPLE_EMPLOYEES.filter((e) => {
      if (department !== 'All Departments' && e.department !== department) return false;
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [department, search]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shiftId || selected.size === 0) return;
    onAssign({ shiftId, empIds: Array.from(selected), effectiveFrom: from, effectiveTo: to });
    setSelected(new Set());
    onClose();
  };

  const base = 'w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50';
  const labelCls = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Shift" className="max-w-2xl">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className={base}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Select Shift *</label>
            <select required value={shiftId} onChange={(e) => setShiftId(e.target.value)} className={base}>
              {activeShifts.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.startTime} – {s.endTime})</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Effective From *</label>
            <input type="date" required value={from} onChange={(e) => setFrom(e.target.value)} className={base} />
          </div>
          <div>
            <label className={labelCls}>Effective To (optional)</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={base} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Employees ({selected.size} selected)</label>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..." className={`${base} pl-9`} />
          </div>
          <div className="max-h-56 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
            {employees.map((e) => {
              const on = selected.has(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => toggle(e.id)}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{e.name}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{e.id} · {e.department}</p>
                  </div>
                  <div className={`h-5 w-5 rounded border flex items-center justify-center ${on ? 'bg-[#94cb3d] border-[#94cb3d]' : 'border-zinc-300 dark:border-zinc-700'}`}>
                    {on && <Check className="h-3 w-3 text-white" />}
                  </div>
                </button>
              );
            })}
            {employees.length === 0 && <p className="px-3 py-6 text-center text-sm text-zinc-500">No employees match</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm" disabled={selected.size === 0}>Assign Shift</Button>
        </div>
      </form>
    </Modal>
  );
}
