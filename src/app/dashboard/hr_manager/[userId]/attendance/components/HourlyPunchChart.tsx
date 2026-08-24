'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card/Card';

const hours = ['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'];
const punchIn = [2, 18, 142, 28, 4, 1, 0, 2, 0, 0, 1, 0];
const punchOut = [0, 0, 0, 0, 0, 8, 4, 2, 5, 14, 96, 62];

const W = 720;
const H = 240;
const PAD = { top: 16, right: 20, bottom: 36, left: 36 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;
const stepX = innerW / (hours.length - 1);
const maxY = Math.max(...punchIn, ...punchOut);
const yScale = (v: number) => PAD.top + innerH - (v / maxY) * innerH;
const xScale = (i: number) => PAD.left + i * stepX;

const buildPath = (vals: number[]) =>
  vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ');

const buildArea = (vals: number[]) =>
  `${buildPath(vals)} L ${xScale(vals.length - 1)} ${PAD.top + innerH} L ${xScale(0)} ${PAD.top + innerH} Z`;

export default function HourlyPunchChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Hourly Punch Activity</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Today&apos;s punch-in vs punch-out distribution</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#94cb3d' }} />
            Punch In
          </span>
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#3b82f6' }} />
            Punch Out
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[560px]">
          <defs>
            <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94cb3d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#94cb3d" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
            const v = Math.round(maxY * p);
            const y = PAD.top + innerH - p * innerH;
            return (
              <g key={i}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />
                <text x={PAD.left - 6} y={y + 4} textAnchor="end" className="fill-zinc-400 text-[10px]">{v}</text>
              </g>
            );
          })}

          <path d={buildArea(punchIn)} fill="url(#gIn)" />
          <path d={buildPath(punchIn)} fill="none" stroke="#94cb3d" strokeWidth={2.5} strokeLinejoin="round" />
          <path d={buildArea(punchOut)} fill="url(#gOut)" />
          <path d={buildPath(punchOut)} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinejoin="round" />

          {hours.map((h, i) => (
            <g key={h} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={xScale(i) - stepX / 2} y={PAD.top} width={stepX} height={innerH} fill="transparent" />
              <circle cx={xScale(i)} cy={yScale(punchIn[i])} r={hover === i ? 5 : 3} fill="#94cb3d" stroke="white" strokeWidth={2} />
              <circle cx={xScale(i)} cy={yScale(punchOut[i])} r={hover === i ? 5 : 3} fill="#3b82f6" stroke="white" strokeWidth={2} />
              <text x={xScale(i)} y={H - PAD.bottom + 16} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400 text-[10px]">{h}</text>

              {hover === i && (
                <g>
                  <line x1={xScale(i)} x2={xScale(i)} y1={PAD.top} y2={PAD.top + innerH} stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" strokeDasharray="2 2" />
                  <rect x={xScale(i) - 50} y={PAD.top + 4} width={100} height={42} rx={6} className="fill-zinc-900 dark:fill-zinc-50" />
                  <text x={xScale(i)} y={PAD.top + 20} textAnchor="middle" className="fill-white dark:fill-zinc-900 text-[10px] font-semibold">{h}</text>
                  <text x={xScale(i)} y={PAD.top + 32} textAnchor="middle" className="fill-white dark:fill-zinc-900 text-[10px]">In: {punchIn[i]} · Out: {punchOut[i]}</text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
}
