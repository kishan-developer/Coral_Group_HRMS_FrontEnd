'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card/Card';

interface DayPoint {
  day: string;
  present: number;
  late: number;
  absent: number;
}

const data: DayPoint[] = [
  { day: 'Mon', present: 192, late: 8, absent: 18 },
  { day: 'Tue', present: 201, late: 5, absent: 12 },
  { day: 'Wed', present: 198, late: 11, absent: 9 },
  { day: 'Thu', present: 205, late: 4, absent: 9 },
  { day: 'Fri', present: 188, late: 14, absent: 16 },
  { day: 'Sat', present: 142, late: 6, absent: 70 },
  { day: 'Sun', present: 0, late: 0, absent: 218 },
];

const W = 720;
const H = 260;
const PAD = { top: 20, right: 20, bottom: 40, left: 40 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;
const maxTotal = Math.max(...data.map((d) => d.present + d.late + d.absent));
const barW = innerW / data.length;

const SERIES = [
  { key: 'present' as const, label: 'Present', color: '#94cb3d' },
  { key: 'late' as const, label: 'Late', color: '#f59e0b' },
  { key: 'absent' as const, label: 'Absent', color: '#ef4444' },
];

export default function WeeklyTrendChart() {
  const [hover, setHover] = useState<number | null>(null);

  const yTicks = 4;
  const tickStep = Math.ceil(maxTotal / yTicks / 50) * 50;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Weekly Attendance Trend</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Present / Late / Absent across the last 7 days</p>
        </div>
        <div className="flex gap-3 text-xs">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[560px]">
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const v = i * tickStep;
            const y = PAD.top + innerH - (v / (tickStep * yTicks)) * innerH;
            return (
              <g key={i}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />
                <text x={PAD.left - 8} y={y + 4} textAnchor="end" className="fill-zinc-400 text-[10px]">{v}</text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const total = d.present + d.late + d.absent;
            const x = PAD.left + i * barW + barW * 0.2;
            const w = barW * 0.6;
            let yCursor = PAD.top + innerH;
            const segs = SERIES.map((s) => {
              const h = total === 0 ? 0 : (d[s.key] / (tickStep * yTicks)) * innerH;
              yCursor -= h;
              return { y: yCursor, h, color: s.color, label: s.label, value: d[s.key] };
            });

            return (
              <g key={d.day} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                {hover === i && (
                  <rect x={PAD.left + i * barW} y={PAD.top} width={barW} height={innerH} className="fill-zinc-100 dark:fill-zinc-800/40" />
                )}
                {segs.map((seg, j) => (
                  <rect
                    key={j}
                    x={x}
                    y={seg.y}
                    width={w}
                    height={seg.h}
                    fill={seg.color}
                    rx={j === 0 ? 3 : 0}
                  />
                ))}
                <text x={x + w / 2} y={H - PAD.bottom + 18} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[11px]">
                  {d.day}
                </text>

                {hover === i && (
                  <g>
                    <rect x={x + w / 2 - 55} y={PAD.top + 4} width={110} height={62} rx={6} className="fill-zinc-900 dark:fill-zinc-50" />
                    <text x={x + w / 2} y={PAD.top + 20} textAnchor="middle" className="fill-white dark:fill-zinc-900 text-[10px] font-semibold">{d.day} · Total {total}</text>
                    {SERIES.map((s, k) => (
                      <text key={s.key} x={x + w / 2} y={PAD.top + 34 + k * 11} textAnchor="middle" className="fill-white dark:fill-zinc-900 text-[10px]">
                        {s.label}: {d[s.key]}
                      </text>
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
