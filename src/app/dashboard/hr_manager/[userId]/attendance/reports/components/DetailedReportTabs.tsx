'use client';

import { useMemo, useState } from 'react';
import Badge from '@/components/ui/Badge/Badge';
import { ReportRow, LeaveRecord, RegularizationRecord, STATUS_BADGE } from './reportsData';

interface Props {
  rows: ReportRow[];
  leaves: LeaveRecord[];
  regularizations: RegularizationRecord[];
}

type TabId = 'daily' | 'monthly' | 'shift' | 'leave' | 'regularization';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'daily', label: 'Daily' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'shift', label: 'Shift' },
  { id: 'leave', label: 'Leave' },
  { id: 'regularization', label: 'Regularization' },
];

export default function DetailedReportTabs({ rows, leaves, regularizations }: Props) {
  const [active, setActive] = useState<TabId>('daily');
  const [day, setDay] = useState<string>(() => {
    const dates = Array.from(new Set(rows.map((r) => r.date))).sort();
    return dates[dates.length - 1] ?? new Date().toISOString().slice(0, 10);
  });

  const availableDates = useMemo(() => Array.from(new Set(rows.map((r) => r.date))).sort(), [rows]);

  const dailyRows = useMemo(() => rows.filter((r) => r.date === day), [rows, day]);

  const monthlySummary = useMemo(() => {
    const map = new Map<string, { name: string; dept: string; present: number; absent: number; leave: number; hours: number }>();
    rows.forEach((r) => {
      const cur = map.get(r.empId) ?? { name: r.name, dept: r.department, present: 0, absent: 0, leave: 0, hours: 0 };
      if (r.status === 'Present' || r.status === 'Late' || r.status === 'Early Out') cur.present++;
      else if (r.status === 'Absent') cur.absent++;
      else if (r.status === 'Leave') cur.leave++;
      cur.hours += r.totalHours;
      map.set(r.empId, cur);
    });
    return Array.from(map.entries()).map(([empId, v]) => ({ empId, ...v }));
  }, [rows]);

  const shiftSummary = useMemo(() => {
    const map = new Map<string, { late: number; earlyOut: number; ot: number; total: number }>();
    rows.forEach((r) => {
      const cur = map.get(r.shift) ?? { late: 0, earlyOut: 0, ot: 0, total: 0 };
      if (r.status === 'Late') cur.late++;
      if (r.status === 'Early Out') cur.earlyOut++;
      cur.ot += r.overtimeHours;
      cur.total++;
      map.set(r.shift, cur);
    });
    return Array.from(map.entries()).map(([shift, v]) => ({ shift, ...v }));
  }, [rows]);

  const leaveBreakdown = useMemo(() => {
    const byType = new Map<string, number>();
    const byStatus = { Approved: 0, Pending: 0, Rejected: 0 };
    leaves.forEach((l) => {
      byType.set(l.type, (byType.get(l.type) ?? 0) + l.days);
      byStatus[l.status]++;
    });
    return { byType: Array.from(byType.entries()), byStatus };
  }, [leaves]);

  const regBadge = { Pending: 'warning', Approved: 'success', Rejected: 'error' } as const;
  const leaveBadge = { Approved: 'success', Pending: 'warning', Rejected: 'error' } as const;

  const th = 'px-3 py-2 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide';
  const td = 'px-3 py-2 text-sm';

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800 px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${active === t.id ? 'border-[#94cb3d] text-[#94cb3d]' : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            {t.label} Report
          </button>
        ))}
      </div>

      <div className="p-4">
        {active === 'daily' && (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <label className="text-xs text-zinc-600 dark:text-zinc-400">Date:</label>
              <select value={day} onChange={(e) => setDay(e.target.value)} className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50">
                {availableDates.map((d) => <option key={d}>{d}</option>)}
              </select>
              <span className="text-xs text-zinc-500 ml-2">{dailyRows.length} employees</span>
            </div>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0">
                  <tr><th className={th}>Employee</th><th className={th}>Department</th><th className={th}>In</th><th className={th}>Out</th><th className={th}>Hours</th><th className={th}>Status</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {dailyRows.map((r) => (
                    <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className={td + ' font-medium text-zinc-900 dark:text-zinc-50'}>{r.name}</td>
                      <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{r.department}</td>
                      <td className={td + ' font-mono text-xs'}>{r.inTime ?? '—'}</td>
                      <td className={td + ' font-mono text-xs'}>{r.outTime ?? '—'}</td>
                      <td className={td}>{r.totalHours.toFixed(1)}h</td>
                      <td className={td}><Badge variant={STATUS_BADGE[r.status]} size="sm">{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'monthly' && (
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0">
                <tr><th className={th}>Employee</th><th className={th}>Emp ID</th><th className={th}>Department</th><th className={th}>Present</th><th className={th}>Absent</th><th className={th}>Leave</th><th className={th}>Total Hours</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {monthlySummary.map((m) => (
                  <tr key={m.empId} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className={td + ' font-medium text-zinc-900 dark:text-zinc-50'}>{m.name}</td>
                    <td className={td + ' font-mono text-xs text-zinc-600 dark:text-zinc-400'}>{m.empId}</td>
                    <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{m.dept}</td>
                    <td className={td + ' text-green-600 dark:text-green-400 font-medium'}>{m.present}</td>
                    <td className={td + ' text-red-600 dark:text-red-400 font-medium'}>{m.absent}</td>
                    <td className={td + ' text-blue-600 dark:text-blue-400 font-medium'}>{m.leave}</td>
                    <td className={td + ' font-semibold'}>{m.hours.toFixed(1)}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'shift' && (
          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60">
                <tr><th className={th}>Shift</th><th className={th}>Records</th><th className={th}>Late Arrivals</th><th className={th}>Early Outs</th><th className={th}>Overtime (h)</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {shiftSummary.map((s) => (
                  <tr key={s.shift}>
                    <td className={td + ' font-medium text-zinc-900 dark:text-zinc-50'}>{s.shift}</td>
                    <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{s.total}</td>
                    <td className={td + ' text-amber-600 dark:text-amber-400 font-medium'}>{s.late}</td>
                    <td className={td + ' text-orange-600 dark:text-orange-400 font-medium'}>{s.earlyOut}</td>
                    <td className={td + ' text-purple-600 dark:text-purple-400 font-medium'}>{s.ot.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'leave' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {leaveBreakdown.byType.map(([type, days]) => (
                <div key={type} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase">{type}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{days} <span className="text-xs font-medium text-zinc-500">days</span></p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['Approved', 'Pending', 'Rejected'] as const).map((s) => (
                <div key={s} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase">{s}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{leaveBreakdown.byStatus[s]}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60">
                  <tr><th className={th}>Employee</th><th className={th}>Department</th><th className={th}>Type</th><th className={th}>From</th><th className={th}>To</th><th className={th}>Days</th><th className={th}>Status</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td className={td + ' font-medium text-zinc-900 dark:text-zinc-50'}>{l.name}</td>
                      <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{l.department}</td>
                      <td className={td}>{l.type}</td>
                      <td className={td + ' font-mono text-xs'}>{l.from}</td>
                      <td className={td + ' font-mono text-xs'}>{l.to}</td>
                      <td className={td}>{l.days}</td>
                      <td className={td}><Badge variant={leaveBadge[l.status]} size="sm">{l.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'regularization' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {(['Pending', 'Approved', 'Rejected'] as const).map((s) => (
                <div key={s} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase">{s}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{regularizations.filter((r) => r.status === s).length}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60">
                  <tr><th className={th}>Employee</th><th className={th}>Department</th><th className={th}>Date</th><th className={th}>Reason</th><th className={th}>Status</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {regularizations.map((r) => (
                    <tr key={r.id}>
                      <td className={td + ' font-medium text-zinc-900 dark:text-zinc-50'}>{r.name}</td>
                      <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{r.department}</td>
                      <td className={td + ' font-mono text-xs'}>{r.date}</td>
                      <td className={td + ' text-zinc-700 dark:text-zinc-300'}>{r.reason}</td>
                      <td className={td}><Badge variant={regBadge[r.status]} size="sm">{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
