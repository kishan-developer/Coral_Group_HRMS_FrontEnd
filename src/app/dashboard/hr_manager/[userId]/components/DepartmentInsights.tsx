import { Building2, Hotel, Home, Shirt, Briefcase } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

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
    { name: 'Real Estate', total: 5, present: 4, absent: 0, leave: 0, gps: 3, attendanceRate: 80 },
    { name: 'Hotels', total: 4, present: 3, absent: 1, leave: 0, gps: 1, attendanceRate: 75 },
    { name: 'Saree Mfg', total: 4, present: 3, absent: 0, leave: 1, gps: 0, attendanceRate: 75 },
    { name: 'Corporate HO', total: 5, present: 4, absent: 0, leave: 0, gps: 0, attendanceRate: 80 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {departmentsList.map((d) => {
        const Icon = getDeptIcon(d.name);
        const attendanceRate = d.attendanceRate ?? (d.total > 0 ? Math.round((d.present / d.total) * 100) : 0);

        return (
          <Card key={d.name} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#94cb3d]/10 text-[#94cb3d]">
                <Icon className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{d.name}</h4>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Present</p>
                <p className="font-semibold text-green-600">{d.present}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Absent</p>
                <p className="font-semibold text-red-600">{d.absent}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">On Leave</p>
                <p className="font-semibold text-blue-600">{d.leave}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">GPS</p>
                <p className="font-semibold text-purple-600">{d.gps}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-zinc-500">Attendance</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">{attendanceRate}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-[#94cb3d]" style={{ width: `${Math.min(100, attendanceRate)}%` }} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
