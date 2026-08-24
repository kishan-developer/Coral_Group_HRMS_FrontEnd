'use client';

import { useEffect, useMemo, useState } from 'react';
import ReportsFilters, { DEFAULT_REPORTS_FILTERS, ReportsFilterState } from './components/ReportsFilters';
import ReportsKPIs from './components/ReportsKPIs';
import ReportsTable from './components/ReportsTable';
import ReportsCharts from './components/ReportsCharts';
import DetailedReportTabs from './components/DetailedReportTabs';
import ReportsAlerts from './components/ReportsAlerts';
import ExportCenter from './components/ExportCenter';
import RoleBanner from './components/RoleBanner';
import DetailedLogModal from './components/DetailedLogModal';
import { REPORT_ROWS, LEAVE_ROWS, REGULARIZATION_ROWS, ReportRow, Role } from './components/reportsData';

// Manager's allowed department (demo)
const MANAGER_DEPT = 'Real Estate';

export default function AttendanceReportsPage() {
  const [role, setRole] = useState<Role>('admin');
  const [draft, setDraft] = useState<ReportsFilterState>(DEFAULT_REPORTS_FILTERS);
  const [applied, setApplied] = useState<ReportsFilterState>(DEFAULT_REPORTS_FILTERS);
  const [selected, setSelected] = useState<ReportRow | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  // Apply role-based department restriction for manager
  useEffect(() => {
    if (role === 'manager') {
      const next = { ...applied, department: MANAGER_DEPT };
      setApplied(next);
      setDraft(next);
    }
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    return REPORT_ROWS.filter((r) => {
      if (r.date < applied.from || r.date > applied.to) return false;
      if (applied.department !== 'All Departments' && r.department !== applied.department) return false;
      if (applied.employee !== 'All Employees' && r.name !== applied.employee) return false;
      if (applied.shift !== 'All Shifts' && r.shift !== applied.shift) return false;
      if (applied.status !== 'All' && r.status !== applied.status) return false;
      if (role === 'manager' && r.department !== MANAGER_DEPT) return false;
      return true;
    });
  }, [applied, role]);

  const filteredLeaves = useMemo(() => {
    return LEAVE_ROWS.filter((l) => {
      if (applied.department !== 'All Departments' && l.department !== applied.department) return false;
      if (role === 'manager' && l.department !== MANAGER_DEPT) return false;
      return true;
    });
  }, [applied, role]);

  const filteredRegs = useMemo(() => {
    return REGULARIZATION_ROWS.filter((r) => {
      if (applied.department !== 'All Departments' && r.department !== applied.department) return false;
      if (role === 'manager' && r.department !== MANAGER_DEPT) return false;
      return true;
    });
  }, [applied, role]);

  const canExport = role !== 'manager' || true; // manager allowed to export own dept
  const canBulkExport = role === 'admin' || role === 'hr';

  // Export helpers
  const exportCSV = () => {
    const headers = ['Date', 'Emp ID', 'Name', 'Department', 'Shift', 'In', 'Out', 'Hours', 'Status', 'Late', 'EarlyOut', 'OT', 'Regularization'];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [
      headers.join(','),
      ...filtered.map((r) =>
        [r.date, r.empId, r.name, r.department, r.shift, r.inTime ?? '-', r.outTime ?? '-', String(r.totalHours), r.status, String(r.lateMinutes), String(r.earlyOutMinutes), String(r.overtimeHours), r.regularization].map(escape).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${applied.from}_to_${applied.to}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast('CSV downloaded');
  };

  const exportPDF = (title = 'Attendance Report') => {
    const html = `<!doctype html><html><head><title>${title}</title>
<style>body{font-family:sans-serif;padding:20px}h1{font-size:18px;margin:0 0 12px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #ddd;padding:5px;text-align:left}th{background:#f5f5f5}.meta{color:#666;font-size:11px;margin-bottom:10px}</style>
</head><body>
<h1>${title}</h1>
<div class="meta">${applied.from} → ${applied.to} · ${filtered.length} records · ${applied.department}</div>
<table><thead><tr><th>Date</th><th>Emp ID</th><th>Name</th><th>Dept</th><th>Shift</th><th>In</th><th>Out</th><th>Hrs</th><th>Status</th><th>OT</th></tr></thead>
<tbody>${filtered.map((r) => `<tr><td>${r.date}</td><td>${r.empId}</td><td>${r.name}</td><td>${r.department}</td><td>${r.shift}</td><td>${r.inTime ?? '-'}</td><td>${r.outTime ?? '-'}</td><td>${r.totalHours.toFixed(1)}</td><td>${r.status}</td><td>${r.overtimeHours.toFixed(1)}</td></tr>`).join('')}</tbody></table>
<script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open('', '_blank', 'width=1000,height=700');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    setToast('PDF report generated');
  };

  const handleDownloadSinglePDF = (r: ReportRow) => {
    const html = `<!doctype html><html><head><title>Attendance — ${r.name}</title>
<style>body{font-family:sans-serif;padding:24px}h1{font-size:18px;margin:0 0 4px}.meta{color:#666;font-size:12px;margin-bottom:16px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cell{border:1px solid #ddd;padding:8px;border-radius:6px}.k{font-size:10px;color:#666;text-transform:uppercase;letter-spacing:.05em}.v{font-size:14px;font-weight:600}</style>
</head><body>
<h1>Daily Attendance — ${r.name}</h1>
<div class="meta">${r.empId} · ${r.department} · ${r.date}</div>
<div class="grid">
  <div class="cell"><div class="k">Shift</div><div class="v">${r.shift}</div></div>
  <div class="cell"><div class="k">Status</div><div class="v">${r.status}</div></div>
  <div class="cell"><div class="k">In Time</div><div class="v">${r.inTime ?? '—'}</div></div>
  <div class="cell"><div class="k">Out Time</div><div class="v">${r.outTime ?? '—'}</div></div>
  <div class="cell"><div class="k">Total Hours</div><div class="v">${r.totalHours.toFixed(2)}h</div></div>
  <div class="cell"><div class="k">Overtime</div><div class="v">${r.overtimeHours.toFixed(2)}h</div></div>
  <div class="cell"><div class="k">Late</div><div class="v">${r.lateMinutes} min</div></div>
  <div class="cell"><div class="k">Early Out</div><div class="v">${r.earlyOutMinutes} min</div></div>
  <div class="cell"><div class="k">Regularization</div><div class="v">${r.regularization}</div></div>
</div>
<script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open('', '_blank', 'width=720,height=600');
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  const handleBulkExport = ({ from, to, department }: { from: string; to: string; department: string }) => {
    const rows = REPORT_ROWS.filter((r) => {
      if (r.date < from || r.date > to) return false;
      if (department !== 'All Departments' && r.department !== department) return false;
      return true;
    });
    const html = `<!doctype html><html><head><title>Bulk Report</title>
<style>body{font-family:sans-serif;padding:20px}h1{font-size:18px;margin:0 0 8px}.meta{color:#666;font-size:11px;margin-bottom:14px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #ddd;padding:5px}th{background:#f5f5f5}</style>
</head><body>
<h1>Bulk Attendance Report</h1>
<div class="meta">${from} → ${to} · ${department} · ${rows.length} records</div>
<table><thead><tr><th>Date</th><th>Name</th><th>Dept</th><th>In</th><th>Out</th><th>Hrs</th><th>Status</th></tr></thead>
<tbody>${rows.map((r) => `<tr><td>${r.date}</td><td>${r.name}</td><td>${r.department}</td><td>${r.inTime ?? '-'}</td><td>${r.outTime ?? '-'}</td><td>${r.totalHours.toFixed(1)}</td><td>${r.status}</td></tr>`).join('')}</tbody></table>
<script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open('', '_blank', 'width=1000,height=700');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    setToast(`Bulk export: ${rows.length} records`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Attendance Reports</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Detailed analytics, trends and compliance reports</p>
      </div>

      <RoleBanner role={role} onRoleChange={setRole} />

      <ReportsFilters
        draft={draft}
        onDraftChange={setDraft}
        onApply={() => setApplied(draft)}
        onReset={() => { setDraft(DEFAULT_REPORTS_FILTERS); setApplied(DEFAULT_REPORTS_FILTERS); }}
        onExportCSV={canExport ? exportCSV : () => setToast('Not permitted')}
        onExportXLS={canExport ? exportCSV : () => setToast('Not permitted')}
        onExportPDF={canExport ? () => exportPDF() : () => setToast('Not permitted')}
      />

      <ReportsKPIs rows={filtered} />

      <ReportsTable
        rows={filtered}
        onViewLog={(r) => { setSelected(r); setLogOpen(true); }}
        onDownloadPDF={handleDownloadSinglePDF}
      />

      <ReportsCharts rows={filtered} />

      <DetailedReportTabs rows={filtered} leaves={filteredLeaves} regularizations={filteredRegs} />

      <ReportsAlerts rows={filtered} leaves={filteredLeaves} />

      <ExportCenter onBulkExport={handleBulkExport} canBulk={canBulkExport} />

      <DetailedLogModal row={selected} isOpen={logOpen} onClose={() => setLogOpen(false)} />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
