'use client';

import Card from '@/components/ui/Card/Card';
import { ReportRow } from './reportsData';

interface Props {
  rows: ReportRow[];
}

const WL = 460;
const WH = 220;
const PAD = { top: 16, right: 16, bottom: 32, left: 36 };

// ---- Daily Attendance Trend (line) ----
function DailyTrend({ rows }: Props) {
  const map = new Map<string, { p: number; a: number }>();
  rows.forEach((r) => {
    const cur = map.get(r.date) ?? { p: 0, a: 0 };
    if (r.status === 'Present' || r.status === 'Late' || r.status === 'Early Out') cur.p++;
    else if (r.status === 'Absent') cur.a++;
    map.set(r.date, cur);
  });
  const dates = Array.from(map.keys()).sort();
  const present = dates.map((d) => map.get(d)!.p);
  const absent = dates.map((d) => map.get(d)!.a);
  const max = Math.max(1, ...present, ...absent);
  const innerW = WL - PAD.left - PAD.right;
  const innerH = WH - PAD.top - PAD.bottom;
  const xs = (i: number) => PAD.left + (dates.length <= 1 ? 0 : (i * innerW) / (dates.length - 1));
  const ys = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const path = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');

  return (
    <Card className="p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Daily Attendance Trend</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Present vs Absent per day</p>
      </div>
      <svg viewBox={`0 0 ${WL} ${WH}`} className="w-full h-auto">
        {[0, 0.5, 1].map((p, i) => {
          const y = PAD.top + innerH - p * innerH;
          return <line key={i} x1={PAD.left} x2={WL - PAD.right} y1={y} y2={y} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />;
        })}
        <path d={path(present)} fill="none" stroke="#94cb3d" strokeWidth={2} />
        <path d={path(absent)} fill="none" stroke="#ef4444" strokeWidth={2} />
        {dates.map((d, i) => (
          <g key={d}>
            <circle cx={xs(i)} cy={ys(present[i])} r={3} fill="#94cb3d" />
            <circle cx={xs(i)} cy={ys(absent[i])} r={3} fill="#ef4444" />
            {i % Math.ceil(dates.length / 7) === 0 && (
              <text x={xs(i)} y={WH - 8} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[9px]">{d.slice(5)}</text>
            )}
          </g>
        ))}
      </svg>
      <div className="flex gap-3 text-xs mt-2">
        <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400"><span className="h-2.5 w-2.5 rounded-full" style={{ background: '#94cb3d' }} />Present</span>
        <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400"><span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ef4444' }} />Absent</span>
      </div>
    </Card>
  );
}

// ---- Present vs Absent (donut) ----
function PresentVsAbsentDonut({ rows }: Props) {
  const present = rows.filter((r) => r.status === 'Present' || r.status === 'Late' || r.status === 'Early Out').length;
  const absent = rows.filter((r) => r.status === 'Absent').length;
  const leave = rows.filter((r) => r.status === 'Leave').length;
  const total = present + absent + leave || 1;
  const parts = [
    { label: 'Present', value: present, color: '#94cb3d' },
    { label: 'Absent', value: absent, color: '#ef4444' },
    { label: 'Leave', value: leave, color: '#3b82f6' },
  ];
  const R = 70, STROKE = 22, CIRC = 2 * Math.PI * R, SIZE = 180;
  let offset = 0;

  return (
    <Card className="p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Present vs Absent</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Distribution across selected range</p>
      </div>
      <div className="flex items-center gap-5">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={STROKE} />
          {parts.map((p) => {
            const dash = (p.value / total) * CIRC;
            const seg = (
              <circle key={p.label} cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={p.color} strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRC - dash}`} strokeDashoffset={-offset}
                transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} />
            );
            offset += dash;
            return seg;
          })}
          <text x={SIZE / 2} y={SIZE / 2 - 4} textAnchor="middle" className="fill-zinc-900 dark:fill-zinc-50 text-xl font-bold">{total}</text>
          <text x={SIZE / 2} y={SIZE / 2 + 14} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[10px]">Total records</text>
        </svg>
        <div className="flex-1 space-y-2 text-sm">
          {parts.map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
                {p.label}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">{p.value} <span className="font-medium text-zinc-900 dark:text-zinc-50">({((p.value / total) * 100).toFixed(0)}%)</span></span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ---- Department-wise (horizontal bar) ----
function DepartmentBars({ rows }: Props) {
  const map = new Map<string, { p: number; total: number }>();
  rows.forEach((r) => {
    const cur = map.get(r.department) ?? { p: 0, total: 0 };
    cur.total++;
    if (r.status === 'Present' || r.status === 'Late' || r.status === 'Early Out') cur.p++;
    map.set(r.department, cur);
  });
  const data = Array.from(map.entries()).map(([k, v]) => ({ name: k, pct: v.total ? (v.p / v.total) * 100 : 0, count: v.p, total: v.total }));

  return (
    <Card className="p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Department-wise Attendance</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Present % per department</p>
      </div>
      <div className="space-y-3">
        {data.map((d, i) => {
          const colors = ['#94cb3d', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444'];
          return (
            <div key={d.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">{d.name}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{d.count}/{d.total} · <span className="font-medium text-zinc-900 dark:text-zinc-50">{d.pct.toFixed(0)}%</span></span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: colors[i % colors.length] }} />
              </div>
            </div>
          );
        })}
        {data.length === 0 && <p className="text-sm text-zinc-500 text-center py-4">No data</p>}
      </div>
    </Card>
  );
}

// ---- Overtime Trend (line) ----
function OvertimeTrend({ rows }: Props) {
  const map = new Map<string, number>();
  rows.forEach((r) => map.set(r.date, (map.get(r.date) ?? 0) + r.overtimeHours));
  const dates = Array.from(map.keys()).sort();
  const vals = dates.map((d) => map.get(d) ?? 0);
  const max = Math.max(1, ...vals);
  const innerW = WL - PAD.left - PAD.right;
  const innerH = WH - PAD.top - PAD.bottom;
  const xs = (i: number) => PAD.left + (dates.length <= 1 ? 0 : (i * innerW) / (dates.length - 1));
  const ys = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const path = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');
  const area = `${path} L ${xs(vals.length - 1)} ${PAD.top + innerH} L ${xs(0)} ${PAD.top + innerH} Z`;

  return (
    <Card className="p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Overtime Trend</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Total overtime hours per day</p>
      </div>
      <svg viewBox={`0 0 ${WL} ${WH}`} className="w-full h-auto">
        <defs>
          <linearGradient id="ot-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map((p, i) => {
          const y = PAD.top + innerH - p * innerH;
          return <line key={i} x1={PAD.left} x2={WL - PAD.right} y1={y} y2={y} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />;
        })}
        <path d={area} fill="url(#ot-grad)" />
        <path d={path} fill="none" stroke="#a855f7" strokeWidth={2.5} />
        {dates.map((d, i) => (
          <g key={d}>
            <circle cx={xs(i)} cy={ys(vals[i])} r={3} fill="#a855f7" />
            {i % Math.ceil(dates.length / 7) === 0 && (
              <text x={xs(i)} y={WH - 8} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[9px]">{d.slice(5)}</text>
            )}
          </g>
        ))}
      </svg>
    </Card>
  );
}

export default function ReportsCharts({ rows }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DailyTrend rows={rows} />
      <PresentVsAbsentDonut rows={rows} />
      <DepartmentBars rows={rows} />
      <OvertimeTrend rows={rows} />
    </div>
  );
}
