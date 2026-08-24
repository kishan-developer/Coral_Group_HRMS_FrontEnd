'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DailyHeader from './components/DailyHeader';
import DailyFilters, { DailyFilterState, DEFAULT_DAILY_FILTERS } from './components/DailyFilters';
import DailyMetricCards from './components/DailyMetricCards';
import LiveStatusStrip from './components/LiveStatusStrip';
import DailyAttendanceTable from './components/DailyAttendanceTable';
import RegularizationModal from './components/RegularizationModal';
import EmployeeLogsModal from './components/EmployeeLogsModal';
import EditAttendanceModal from './components/EditAttendanceModal';
import MarkAttendanceModal from '../components/MarkAttendanceModal';
import { AttendanceStatus, DailyAttendanceRow, DAILY_ROWS } from './components/dailyData';

const URL_TO_STATUS: Record<string, AttendanceStatus | 'All'> = {
  present: 'Present',
  absent: 'Absent',
  leave: 'Leave',
  late: 'Late',
  'early-out': 'Early Out',
  'not-marked': 'Not Marked',
};

function DailyAttendancePageInner() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get('status');
  const initialStatus = urlStatus && URL_TO_STATUS[urlStatus] ? URL_TO_STATUS[urlStatus] : 'All';

  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [draftFilters, setDraftFilters] = useState<DailyFilterState>({ ...DEFAULT_DAILY_FILTERS, status: initialStatus });
  const [appliedFilters, setAppliedFilters] = useState<DailyFilterState>({ ...DEFAULT_DAILY_FILTERS, status: initialStatus });

  const [rows, setRows] = useState<DailyAttendanceRow[]>(DAILY_ROWS);

  const [selectedRow, setSelectedRow] = useState<DailyAttendanceRow | null>(null);
  const [regOpen, setRegOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const f = appliedFilters;
      if (f.department !== 'All Departments' && r.department !== f.department) return false;
      if (f.employee !== 'All Employees' && r.name !== f.employee) return false;
      if (f.shift !== 'All Shifts' && r.shift !== f.shift) return false;
      if (f.status !== 'All' && r.status !== f.status) return false;
      if (f.employmentType !== 'All Types' && r.employmentType !== f.employmentType) return false;
      return true;
    });
  }, [rows, appliedFilters]);

  const handleApply = () => setAppliedFilters(draftFilters);
  const handleReset = () => {
    setDraftFilters(DEFAULT_DAILY_FILTERS);
    setAppliedFilters(DEFAULT_DAILY_FILTERS);
  };

  const handleStatusClick = (status: AttendanceStatus | 'All') => {
    const next = { ...appliedFilters, status };
    setAppliedFilters(next);
    setDraftFilters(next);
  };

  const handleRegularization = (row: DailyAttendanceRow) => {
    setSelectedRow(row);
    setRegOpen(true);
  };

  const handleViewLogs = (row: DailyAttendanceRow) => {
    setSelectedRow(row);
    setLogsOpen(true);
  };

  const handleEdit = (row: DailyAttendanceRow) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleSaveEdit = (id: string, patch: Partial<DailyAttendanceRow>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setToast('Attendance updated');
  };

  const handleRegDecision = (rowId: string, decision: 'approved' | 'rejected') => {
    setRows((rs) => rs.map((r) => (r.id === rowId ? { ...r, needsRegularization: false } : r)));
    setToast(`Regularization ${decision}`);
  };

  return (
    <div className="space-y-6">
      <DailyHeader date={date} onDateChange={setDate} />

      

      <DailyMetricCards rows={filtered} activeStatus={appliedFilters.status} onStatusClick={handleStatusClick} />

      <LiveStatusStrip rows={filtered} />

      <DailyFilters draft={draftFilters} onDraftChange={setDraftFilters} onApply={handleApply} onReset={handleReset} />

      <DailyAttendanceTable
        rows={filtered}
        onViewLogs={handleViewLogs}
        onEdit={handleEdit}
        onApproveRegularization={handleRegularization}
        onMarkAttendance={() => setMarkOpen(true)}
      />

      <RegularizationModal row={selectedRow} isOpen={regOpen} onClose={() => setRegOpen(false)} onDecision={handleRegDecision} />
      <EmployeeLogsModal row={selectedRow} isOpen={logsOpen} onClose={() => setLogsOpen(false)} />
      <EditAttendanceModal row={selectedRow} isOpen={editOpen} onClose={() => setEditOpen(false)} onSave={handleSaveEdit} />
      <MarkAttendanceModal isOpen={markOpen} onClose={() => setMarkOpen(false)} />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default function DailyAttendancePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-zinc-500">Loading...</div>}>
      <DailyAttendancePageInner />
    </Suspense>
  );
}
