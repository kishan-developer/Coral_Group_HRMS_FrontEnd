'use client';

import { useEffect, useMemo, useState } from 'react';
import ShiftsHeader from './components/ShiftsHeader';
import ShiftsFilters, { DEFAULT_SHIFTS_FILTERS, ShiftsFilterState } from './components/ShiftsFilters';
import ShiftsSummaryWidgets from './components/ShiftsSummaryWidgets';
import ShiftsTable from './components/ShiftsTable';
import ShiftFormModal from './components/ShiftFormModal';
import AssignShiftModal from './components/AssignShiftModal';
import AssignedEmployeesModal from './components/AssignedEmployeesModal';
import ShiftCalendarView from './components/ShiftCalendarView';
import ShiftAlerts from './components/ShiftAlerts';
import ShiftAuditLogs from './components/ShiftAuditLogs';
import {
  Shift,
  ShiftAssignment,
  AuditLog,
  SHIFTS_SEED,
  ASSIGNMENTS_SEED,
  AUDIT_LOGS_SEED,
  SAMPLE_EMPLOYEES,
} from './components/shiftsData';

const parseHM = (hm: string) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};

export default function ShiftsManagementPage() {
  const [shifts, setShifts] = useState<Shift[]>(SHIFTS_SEED);
  const [assignments, setAssignments] = useState<ShiftAssignment[]>(ASSIGNMENTS_SEED);
  const [logs, setLogs] = useState<AuditLog[]>(AUDIT_LOGS_SEED);

  const [draft, setDraft] = useState<ShiftsFilterState>(DEFAULT_SHIFTS_FILTERS);
  const [applied, setApplied] = useState<ShiftsFilterState>(DEFAULT_SHIFTS_FILTERS);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Shift | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignedOpen, setAssignedOpen] = useState(false);
  const [viewingShift, setViewingShift] = useState<Shift | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const filtered = useMemo(() => {
    return shifts.filter((s) => {
      if (applied.type !== 'All Types' && s.type !== applied.type) return false;
      if (applied.status !== 'All' && s.status !== applied.status) return false;
      if (applied.fromTime && parseHM(s.startTime) < parseHM(applied.fromTime)) return false;
      if (applied.toTime && parseHM(s.endTime) > parseHM(applied.toTime)) return false;
      if (applied.department !== 'All Departments') {
        const hasDept = assignments.some((a) => a.shiftId === s.id && a.department === applied.department);
        if (!hasDept) return false;
      }
      return true;
    });
  }, [shifts, applied, assignments]);

  const pushLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    setLogs((ls) => [
      { ...log, id: `lg-${Date.now()}`, timestamp: new Date().toISOString() },
      ...ls,
    ]);
  };

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (s: Shift) => { setEditing(s); setFormOpen(true); };

  const handleSave = (data: Omit<Shift, 'id' | 'assignedCount' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>) => {
    if (editing) {
      setShifts((arr) => arr.map((s) => (s.id === editing.id ? { ...s, ...data, updatedBy: 'Admin', updatedAt: new Date().toISOString() } : s)));
      pushLog({ shiftId: editing.id, shiftName: data.name, action: 'edited', actor: 'Admin', detail: 'Shift details updated' });
      setToast('Shift updated');
    } else {
      const id = `sh-${Date.now()}`;
      const newShift: Shift = { ...data, id, assignedCount: 0, createdBy: 'Admin', createdAt: new Date().toISOString() };
      setShifts((arr) => [newShift, ...arr]);
      pushLog({ shiftId: id, shiftName: data.name, action: 'created', actor: 'Admin', detail: 'New shift created' });
      setToast('Shift created');
    }
  };

  const handleDuplicate = (s: Shift) => {
    const id = `sh-${Date.now()}`;
    const copy: Shift = { ...s, id, name: `${s.name} (Copy)`, code: `${s.code}-C`, assignedCount: 0, createdBy: 'Admin', createdAt: new Date().toISOString() };
    setShifts((arr) => [copy, ...arr]);
    pushLog({ shiftId: id, shiftName: copy.name, action: 'duplicated', actor: 'Admin', detail: `Duplicated from ${s.name}` });
    setToast('Shift duplicated');
  };

  const handleDelete = (ids: string[]) => {
    const targets = shifts.filter((s) => ids.includes(s.id));
    if (!window.confirm(`Delete ${targets.length} shift(s)? This cannot be undone.`)) return;
    setShifts((arr) => arr.filter((s) => !ids.includes(s.id)));
    setAssignments((arr) => arr.filter((a) => !ids.includes(a.shiftId)));
    targets.forEach((t) => pushLog({ shiftId: t.id, shiftName: t.name, action: 'deleted', actor: 'Admin' }));
    setToast(`${targets.length} shift(s) deleted`);
  };

  const handleToggleStatus = (ids: string[]) => {
    setShifts((arr) =>
      arr.map((s) => {
        if (!ids.includes(s.id)) return s;
        const next = s.status === 'Active' ? 'Inactive' : 'Active';
        pushLog({ shiftId: s.id, shiftName: s.name, action: 'status-changed', actor: 'Admin', detail: `${s.status} → ${next}` });
        return { ...s, status: next, updatedBy: 'Admin', updatedAt: new Date().toISOString() };
      })
    );
    setToast('Status updated');
  };

  const handleViewAssigned = (s: Shift) => { setViewingShift(s); setAssignedOpen(true); };

  const handleAssign = ({ shiftId, empIds, effectiveFrom, effectiveTo }: { shiftId: string; empIds: string[]; effectiveFrom: string; effectiveTo: string }) => {
    const target = shifts.find((s) => s.id === shiftId);
    if (!target) return;
    const newAssignments: ShiftAssignment[] = empIds.map((empId) => {
      const e = SAMPLE_EMPLOYEES.find((x) => x.id === empId);
      return {
        id: `a-${Date.now()}-${empId}`,
        shiftId,
        empId,
        empName: e?.name ?? empId,
        department: e?.department ?? '—',
        effectiveFrom,
        effectiveTo: effectiveTo || undefined,
      };
    });
    setAssignments((arr) => [...newAssignments, ...arr]);
    setShifts((arr) => arr.map((s) => (s.id === shiftId ? { ...s, assignedCount: s.assignedCount + empIds.length } : s)));
    pushLog({ shiftId, shiftName: target.name, action: 'assigned', actor: 'Admin', detail: `${empIds.length} employee(s) assigned` });
    setToast(`Assigned ${empIds.length} employee(s)`);
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    const a = assignments.find((x) => x.id === assignmentId);
    if (!a) return;
    if (!window.confirm(`Remove ${a.empName} from this shift?`)) return;
    setAssignments((arr) => arr.filter((x) => x.id !== assignmentId));
    setShifts((arr) => arr.map((s) => (s.id === a.shiftId ? { ...s, assignedCount: Math.max(0, s.assignedCount - 1) } : s)));
    setToast('Assignment removed');
  };

  const handleChangeShiftAssignment = () => {
    setAssignedOpen(false);
    setAssignOpen(true);
  };

  // Exports
  const exportCSV = () => {
    const headers = ['Name', 'Code', 'Start', 'End', 'Break (m)', 'Hours', 'Type', 'Assigned', 'Status'];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [
      headers.join(','),
      ...filtered.map((s) => [s.name, s.code, s.startTime, s.endTime, String(s.breakMinutes), s.workingHours, s.type, String(s.assignedCount), s.status].map(escape).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shifts-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const html = `<!doctype html><html><head><title>Shifts</title>
<style>body{font-family:sans-serif;padding:20px}h1{font-size:18px;margin:0 0 12px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #ddd;padding:6px;text-align:left}th{background:#f5f5f5}</style>
</head><body><h1>Shift Management Report — ${new Date().toLocaleDateString()}</h1>
<table><thead><tr><th>Name</th><th>Code</th><th>Start</th><th>End</th><th>Break</th><th>Hours</th><th>Type</th><th>Assigned</th><th>Status</th></tr></thead>
<tbody>${filtered.map((s) => `<tr><td>${s.name}</td><td>${s.code}</td><td>${s.startTime}</td><td>${s.endTime}</td><td>${s.breakMinutes}m</td><td>${s.workingHours}</td><td>${s.type}</td><td>${s.assignedCount}</td><td>${s.status}</td></tr>`).join('')}</tbody></table>
<script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="space-y-6">
      <ShiftsHeader
        onAdd={handleAdd}
        onAssign={() => setAssignOpen(true)}
        onExportCSV={exportCSV}
        onExportXLS={exportCSV}
        onExportPDF={exportPDF}
      />

      <ShiftsSummaryWidgets shifts={shifts} />

      <ShiftsFilters
        draft={draft}
        onDraftChange={setDraft}
        onApply={() => setApplied(draft)}
        onReset={() => { setDraft(DEFAULT_SHIFTS_FILTERS); setApplied(DEFAULT_SHIFTS_FILTERS); }}
      />

      <ShiftsTable
        shifts={filtered}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onViewAssigned={handleViewAssigned}
      />

      <ShiftCalendarView shifts={shifts} assignments={assignments} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ShiftAlerts shifts={shifts} />
        <ShiftAuditLogs logs={logs} />
      </div>

      <ShiftFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} editing={editing} onSave={handleSave} />
      <AssignShiftModal isOpen={assignOpen} onClose={() => setAssignOpen(false)} shifts={shifts} onAssign={handleAssign} />
      <AssignedEmployeesModal
        isOpen={assignedOpen}
        onClose={() => setAssignedOpen(false)}
        shift={viewingShift}
        assignments={assignments}
        onRemove={handleRemoveAssignment}
        onChangeShift={handleChangeShiftAssignment}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
