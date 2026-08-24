'use client';

import Card from '@/components/ui/Card/Card';

interface Dept {
  name: string;
  present: number;
  total: number;
}

const departments: Dept[] = [
  { name: 'Real Estate', present: 58, total: 62 },
  { name: 'Hotels', present: 71, total: 78 },
  { name: 'Saree Manufacturing', present: 42, total: 50 },
  { name: 'Corporate HO', present: 27, total: 28 },
];

const TOTAL_PRESENT = departments.reduce((s, d) => s + d.present, 0);
const COLORS = ['#94cb3d', '#3b82f6', '#f59e0b', '#a855f7'];

// Donut geometry
const SIZE = 200;
const R = 80;
const STROKE = 26;
const CIRC = 2 * Math.PI * R;

export default function DepartmentBreakdownChart() {
  let offset = 0;

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Department Breakdown</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Present employees by vertical</p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={STROKE} />
            {departments.map((d, i) => {
              const portion = d.present / TOTAL_PRESENT;
              const dash = portion * CIRC;
              const seg = (
                <circle
                  key={d.name}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={STROKE}
                  strokeDasharray={`${dash} ${CIRC - dash}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                  strokeLinecap="butt"
                />
              );
              offset += dash;
              return seg;
            })}
            <text x={SIZE / 2} y={SIZE / 2 - 4} textAnchor="middle" className="fill-zinc-900 dark:fill-zinc-50 text-2xl font-bold">{TOTAL_PRESENT}</text>
            <text x={SIZE / 2} y={SIZE / 2 + 16} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[11px]">Present today</text>
          </svg>
        </div>

        <div className="w-full space-y-2">
          {departments.map((d, i) => {
            const pct = ((d.present / d.total) * 100).toFixed(0);
            return (
              <div key={d.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                    {d.name}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {d.present}/{d.total} · <span className="font-medium text-zinc-900 dark:text-zinc-50">{pct}%</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
