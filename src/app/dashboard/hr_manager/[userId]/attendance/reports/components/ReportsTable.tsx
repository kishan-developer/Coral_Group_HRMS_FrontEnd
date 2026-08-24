'use client';

import { useMemo, useState } from 'react';
import { Search, Eye, Download } from 'lucide-react';
import Badge from '@/components/ui/Badge/Badge';
import Pagination from '@/components/ui/Pagination/Pagination';
import { ReportRow, STATUS_BADGE } from './reportsData';

interface Props {
  rows: ReportRow[];
  onViewLog: (r: ReportRow) => void;
  onDownloadPDF: (r: ReportRow) => void;
}

const PAGE_SIZE = 10;

export default function ReportsTable({ rows, onViewLog, onDownloadPDF }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      [r.name, r.empId, r.department, r.shift, r.date].some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const regBadge: Record<ReportRow['regularization'], 'default' | 'warning' | 'success' | 'error'> = {
    None: 'default', Pending: 'warning', Approved: 'success', Rejected: 'error',
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Attendance Report</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{filtered.length} records</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, ID, date..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800/60 backdrop-blur z-10">
            <tr>
              {['Employee', 'Emp ID', 'Department', 'Date', 'In', 'Out', 'Hours', 'Status', 'Late/Early', 'OT', 'Reg.', 'Actions'].map((h, i) => (
                <th key={h} className={`px-3 py-2.5 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide ${i === 11 ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {pageRows.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="px-3 py-2.5 font-medium text-zinc-900 dark:text-zinc-50">{r.name}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-zinc-600 dark:text-zinc-400">{r.empId}</td>
                <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300">{r.department}</td>
                <td className="px-3 py-2.5 font-mono text-xs">{r.date}</td>
                <td className="px-3 py-2.5 font-mono text-xs">{r.inTime ?? <span className="text-zinc-400">—</span>}</td>
                <td className="px-3 py-2.5 font-mono text-xs">{r.outTime ?? <span className="text-zinc-400">—</span>}</td>
                <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300">{r.totalHours.toFixed(1)}h</td>
                <td className="px-3 py-2.5"><Badge variant={STATUS_BADGE[r.status]} size="sm">{r.status}</Badge></td>
                <td className="px-3 py-2.5 text-xs">
                  {r.lateMinutes > 0 && <span className="text-amber-600 dark:text-amber-400">L {r.lateMinutes}m</span>}
                  {r.earlyOutMinutes > 0 && <span className="text-orange-600 dark:text-orange-400">E {r.earlyOutMinutes}m</span>}
                  {r.lateMinutes === 0 && r.earlyOutMinutes === 0 && <span className="text-zinc-400">—</span>}
                </td>
                <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300">{r.overtimeHours > 0 ? r.overtimeHours.toFixed(1) + 'h' : <span className="text-zinc-400">—</span>}</td>
                <td className="px-3 py-2.5">
                  {r.regularization === 'None' ? <span className="text-zinc-400 text-xs">—</span> : <Badge variant={regBadge[r.regularization]} size="sm">{r.regularization}</Badge>}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex justify-end gap-1">
                    <button type="button" title="View Detailed Log" onClick={() => onViewLog(r)} className="p-1.5 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button type="button" title="Download PDF" onClick={() => onDownloadPDF(r)} className="p-1.5 rounded-md text-zinc-500 hover:text-[#94cb3d] hover:bg-[#94cb3d]/10">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr><td colSpan={12} className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">No records match the filters</td></tr>
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
