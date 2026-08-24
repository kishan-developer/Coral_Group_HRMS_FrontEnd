'use client';

import { AlertTriangle, Briefcase, Clock4, ArrowUpDown } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import { ReportRow, LeaveRecord } from './reportsData';

interface Props {
  rows: ReportRow[];
  leaves: LeaveRecord[];
  leaveQuota?: number;
}

export default function ReportsAlerts({ rows, leaves, leaveQuota = 8 }: Props) {
  const byEmp = new Map<string, { name: string; late: number; missing: number; hours: number; days: number }>();
  rows.forEach((r) => {
    const cur = byEmp.get(r.empId) ?? { name: r.name, late: 0, missing: 0, hours: 0, days: 0 };
    if (r.status === 'Late') cur.late++;
    if (r.inTime && !r.outTime) cur.missing++;
    if (!r.inTime && r.status !== 'Leave' && r.status !== 'Absent') cur.missing++;
    cur.hours += r.totalHours;
    cur.days++;
    byEmp.set(r.empId, cur);
  });

  const consistentLate = Array.from(byEmp.entries()).filter(([, v]) => v.late >= 3).map(([id, v]) => ({ id, ...v }));
  const missingPunches = Array.from(byEmp.entries()).filter(([, v]) => v.missing >= 1).map(([id, v]) => ({ id, ...v }));

  const leaveDaysByEmp = new Map<string, { name: string; days: number }>();
  leaves.forEach((l) => {
    if (l.status !== 'Approved') return;
    const cur = leaveDaysByEmp.get(l.empId) ?? { name: l.name, days: 0 };
    cur.days += l.days;
    leaveDaysByEmp.set(l.empId, cur);
  });
  const exceededLeave = Array.from(leaveDaysByEmp.entries()).filter(([, v]) => v.days >= leaveQuota).map(([id, v]) => ({ id, ...v }));

  const overUnder = Array.from(byEmp.entries()).map(([id, v]) => {
    const avg = v.days ? v.hours / v.days : 0;
    return { id, name: v.name, avg, type: avg > 9 ? 'Over' : avg < 6 ? 'Under' : null };
  }).filter((x) => x.type);

  const sections = [
    { title: 'Consistent Late Marks', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock4, items: consistentLate.map((c) => `${c.name} — ${c.late} late days`), empty: 'No employees with repeated late marks.' },
    { title: 'Exceeding Leave Quota', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400', icon: Briefcase, items: exceededLeave.map((e) => `${e.name} — ${e.days} approved leave days (quota ${leaveQuota})`), empty: 'No one has exceeded the leave quota.' },
    { title: 'Missing IN/OUT Punches', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', icon: AlertTriangle, items: missingPunches.map((m) => `${m.name} — ${m.missing} incident(s)`), empty: 'No missing punches detected.' },
    { title: 'Under/Over Working Hours', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400', icon: ArrowUpDown, items: overUnder.map((o) => `${o.name} — avg ${o.avg.toFixed(1)}h/day (${o.type}working)`), empty: 'All employees within normal working-hour range.' },
  ];

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Alerts & Compliance Flags</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Anomalies derived from the filtered report</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.title} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${sec.color}`}><Icon className="h-3.5 w-3.5" /></div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{sec.title}</p>
                </div>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{sec.items.length}</span>
              </div>
              {sec.items.length === 0 ? (
                <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-9">{sec.empty}</p>
              ) : (
                <ul className="space-y-1 pl-9">
                  {sec.items.slice(0, 4).map((t, i) => <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300">{t}</li>)}
                  {sec.items.length > 4 && <li className="text-[11px] text-zinc-400 italic">+{sec.items.length - 4} more</li>}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
