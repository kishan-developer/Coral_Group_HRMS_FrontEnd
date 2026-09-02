'use client';

import { CalendarDays, Clock, Sun, Users, ShieldCheck, Award, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const leaveStats = [
  { label: 'Applied Today', value: '7 Applications', icon: CalendarDays, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50' },
  { label: 'Pending Approvals', value: '12 Pending', icon: Clock, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50' },
  { label: 'On Approved Leave', value: '1 Staff', icon: Sun, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50' },
  { label: 'Team Available Rate', value: '88% Turnout', icon: Users, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' },
];

const indianHolidays = [
  { date: '26 Jan 2026', name: 'Republic Day', type: 'Gazetted National Holiday' },
  { date: '14 Mar 2026', name: 'Holi (Festival of Colors)', type: 'Gazetted Holiday' },
  { date: '15 Aug 2026', name: 'Independence Day', type: 'Gazetted National Holiday' },
  { date: '02 Oct 2026', name: 'Gandhi Jayanti', type: 'Gazetted National Holiday' },
  { date: '08 Nov 2026', name: 'Diwali (Deepavali)', type: 'Festival Holiday' },
];

export default function LeaveSummary() {
  return (
    <div className="space-y-4 font-sans">
      {/* 6-Month Probation & Priority Consumption Rule Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/90 via-zinc-900 to-indigo-950 text-white border border-blue-800/80 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">
              CL & PL Rules Engine • 6-Month Probation Gate
            </h4>
            <p className="text-xs text-blue-200 mt-0.5">
              0-6 Months: CL Only (+1.0/mo) | 6+ Months: CL (+1.0/mo) & PL (+1.25/mo) | Priority: 1st CL ➔ 2nd PL ➔ 3rd LWP
            </p>
          </div>
        </div>
        <Badge variant="brand" className="text-[10px] whitespace-nowrap self-start md:self-auto">
          Rule Active & Enforced
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: 4 Stat Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {leaveStats.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{s.label}</span>
                <div className={`p-2.5 rounded-xl ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">{s.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Indian National Holidays */}
        <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                Upcoming Indian Holidays
              </h4>
              <Badge variant="outline" className="text-[10px]">2026 Calendar</Badge>
            </div>

            <div className="space-y-2.5">
              {indianHolidays.map((h) => (
                <div key={h.name} className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{h.name}</p>
                    <p className="text-[10px] text-zinc-500">{h.type}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94cb3d] bg-[#94cb3d]/10 px-2.5 py-1 rounded-lg border border-[#94cb3d]/20">
                    {h.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
