'use client';

import { useMemo, useState } from 'react';
import { Search, Eye, Pencil, ClipboardCheck, AlertTriangle, FileSpreadsheet, FileText, Download } from 'lucide-react';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Pagination from '@/components/ui/Pagination/Pagination';
import { DailyAttendanceRow, STATUS_COLORS } from './dailyData';

interface Props {
  rows: DailyAttendanceRow[];
  onViewLogs: (row: DailyAttendanceRow) => void;
  onEdit: (row: DailyAttendanceRow) => void;
  onApproveRegularization: (row: DailyAttendanceRow) => void;
  onMarkAttendance: () => void;
}

const PAGE_SIZE = 8;

interface ColumnSearch {
  name: string;
  empId: string;
  department: string;
  shift: string;
}

export default function DailyAttendanceTable({ rows, onViewLogs, onEdit, onApproveRegularization, onMarkAttendance }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<ColumnSearch>({ name: '', empId: '', department: '', shift: '' });

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (search.name && !r.name.toLowerCase().includes(search.name.toLowerCase())) return false;
      if (search.empId && !r.empId.toLowerCase().includes(search.empId.toLowerCase())) return false;
      if (search.department && !r.department.toLowerCase().includes(search.department.toLowerCase())) return false;
      if (search.shift && !r.shift.toLowerCase().includes(search.shift.toLowerCase())) return false;
      return true;
    });
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const exportCSV = () => {
    const headers = ['Employee ID', 'Name', 'Department', 'Shift', 'In Time', 'Out Time', 'Total Hours', 'Status'];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [
      headers.join(','),
      ...filtered.map((r) =>
        [r.empId, r.name, r.department, r.shift, r.inTime ?? '-', r.outTime ?? '-', r.totalHours, r.status].map(escape).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-attendance-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const html = `<!doctype html><html><head><title>Daily Attendance</title>
<style>body{font-family:sans-serif;padding:20px}h1{font-size:18px;margin:0 0 12px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #ddd;padding:6px;text-align:left}th{background:#f5f5f5}</style>
</head><body><h1>Daily Attendance — ${new Date().toLocaleDateString()}</h1>
<table><thead><tr><th>Emp ID</th><th>Name</th><th>Department</th><th>Shift</th><th>In</th><th>Out</th><th>Hours</th><th>Status</th></tr></thead>
<tbody>${filtered.map((r) => `<tr><td>${r.empId}</td><td>${r.name}</td><td>${r.department}</td><td>${r.shift}</td><td>${r.inTime ?? '-'}</td><td>${r.outTime ?? '-'}</td><td>${r.totalHours}</td><td>${r.status}</td></tr>`).join('')}</tbody></table>
<script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Attendance Records</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{filtered.length} of {rows.length} records</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={onMarkAttendance}>
            <ClipboardCheck className="h-4 w-4" />
            Mark Attendance
          </Button>
          <Button variant="secondary" size="sm" onClick={exportCSV}>
            <FileSpreadsheet className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4" />
            XLS
          </Button>
          <Button variant="secondary" size="sm" onClick={exportPDF}>
            <FileText className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800/60 backdrop-blur z-10">
            <tr>
              {[
                { label: 'Employee', key: 'name' },
                { label: 'Emp ID', key: 'empId' },
                { label: 'Department', key: 'department' },
                { label: 'Shift', key: 'shift' },
              ].map((c) => (
                <th key={c.key} className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                  <div>{c.label}</div>
                  <div className="relative mt-1">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
                    <input
                      value={search[c.key as keyof ColumnSearch]}
                      onChange={(e) => setSearch((s) => ({ ...s, [c.key]: e.target.value }))}
                      placeholder="Search"
                      className="w-full pl-6 pr-2 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#94cb3d]/50 font-normal normal-case tracking-normal"
                    />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">In Time</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Out Time</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Total Hours</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Regularization</th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {pageRows.map((r) => {
              const cfg = STATUS_COLORS[r.status];
              return (
                <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#94cb3d]/10 text-[#94cb3d] flex items-center justify-center text-xs font-semibold">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">{r.name}</p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{r.employmentType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 font-mono text-xs">{r.empId}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{r.department}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    <div>{r.shift}</div>
                    <div className="text-[10px] text-zinc-500">{r.shiftStart} – {r.shiftEnd}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-50">{r.inTime ?? <span className="text-zinc-400">—</span>}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-50">{r.outTime ?? <span className="text-zinc-400">—</span>}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{r.totalHours}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                      <Badge variant={cfg.badge} size="sm">{r.status}</Badge>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.needsRegularization ? (
                      <button
                        type="button"
                        onClick={() => onApproveRegularization(r)}
                        className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline text-xs font-medium"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Pending
                      </button>
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        title="View Logs"
                        onClick={() => onViewLogs(r)}
                        className="p-1.5 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => onEdit(r)}
                        className="p-1.5 rounded-md text-zinc-500 hover:text-[#94cb3d] hover:bg-[#94cb3d]/10 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={10} className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No records match the filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
