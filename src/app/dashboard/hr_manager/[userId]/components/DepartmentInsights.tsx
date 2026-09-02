'use client';

import { Building2, Hotel, Home, Shirt, Briefcase, Users, CheckCircle2, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface DepartmentInsightData {
  name: string;
  total: number;
  present: number;
  absent: number;
  leave: number;
  gps: number;
  attendanceRate?: number;
}

interface DepartmentInsightsProps {
  data?: DepartmentInsightData[];
}

const getDeptIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('hotel')) return Hotel;
  if (n.includes('saree') || n.includes('mfg')) return Shirt;
  if (n.includes('corporate') || n.includes('ho')) return Home;
  if (n.includes('real')) return Building2;
  return Briefcase;
};

export default function DepartmentInsights({ data }: DepartmentInsightsProps) {
  const departmentsList = data && data.length > 0 ? data : [
    { name: 'Real Estate & Infra', total: 5, present: 4, absent: 0, leave: 0, gps: 3, attendanceRate: 80 },
    { name: 'Hotels & Hospitality', total: 4, present: 3, absent: 1, leave: 0, gps: 1, attendanceRate: 75 },
    { name: 'Saree Manufacturing', total: 4, present: 3, absent: 0, leave: 1, gps: 0, attendanceRate: 75 },
    { name: 'Corporate Head Office', total: 5, present: 4, absent: 0, leave: 0, gps: 0, attendanceRate: 80 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
      {departmentsList.map((d) => {
        const Icon = getDeptIcon(d.name);
        const attendanceRate = d.attendanceRate ?? (d.total > 0 ? Math.round((d.present / d.total) * 100) : 0);

        return (
          <Card key={d.name} className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#94cb3d]/20 text-[#94cb3d] border border-[#94cb3d]/30 font-bold shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50">{d.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium">{d.total} Total Staff</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Present</p>
                  <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">{d.present}</p>
                </div>
                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Absent</p>
                  <p className="font-extrabold text-red-600 dark:text-red-400 text-sm mt-0.5">{d.absent}</p>
                </div>
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">On Leave</p>
                  <p className="font-extrabold text-blue-600 dark:text-blue-400 text-sm mt-0.5">{d.leave}</p>
                </div>
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">GPS Field</p>
                  <p className="font-extrabold text-purple-600 dark:text-purple-400 text-sm mt-0.5">{d.gps}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-zinc-500">Attendance Rate</span>
                  <span className="text-[#94cb3d]">{attendanceRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#94cb3d] transition-all"
                    style={{ width: `${Math.min(100, attendanceRate)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
