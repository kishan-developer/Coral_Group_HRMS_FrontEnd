'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Wifi, Coffee, LogIn, LogOut, AlertCircle, Circle } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Badge from '@/components/ui/Badge/Badge';

type LiveStatus = 'Present' | 'Late' | 'On Break' | 'Absent' | 'Offline';

interface LiveRecord {
  id: number;
  name: string;
  avatar: string;
  shift: string;
  punchIn: string;
  punchOut: string;
  workingHours: string;
  status: LiveStatus;
  inOut: 'IN' | 'OUT' | '-';
  department: string;
}

const records: LiveRecord[] = [
  { id: 1, name: 'Rahul Sharma', avatar: 'RS', shift: 'General', punchIn: '09:01', punchOut: '-', workingHours: '4h 32m', status: 'Present', inOut: 'IN', department: 'Real Estate' },
  { id: 2, name: 'Priya Patel', avatar: 'PP', shift: 'General', punchIn: '08:55', punchOut: '-', workingHours: '4h 38m', status: 'Present', inOut: 'IN', department: 'Hotels' },
  { id: 3, name: 'Sneha Gupta', avatar: 'SG', shift: 'General', punchIn: '09:18', punchOut: '-', workingHours: '4h 15m', status: 'Late', inOut: 'IN', department: 'Corporate HO' },
  { id: 4, name: 'Vikram Rao', avatar: 'VR', shift: 'Morning', punchIn: '06:02', punchOut: '-', workingHours: '7h 28m', status: 'On Break', inOut: 'IN', department: 'Real Estate' },
  { id: 5, name: 'Amit Kumar', avatar: 'AK', shift: 'General', punchIn: '-', punchOut: '-', workingHours: '0h 00m', status: 'Absent', inOut: '-', department: 'Saree Manufacturing' },
  { id: 6, name: 'Neha Desai', avatar: 'ND', shift: 'General', punchIn: '08:48', punchOut: '17:45', workingHours: '8h 57m', status: 'Offline', inOut: 'OUT', department: 'Hotels' },
  { id: 7, name: 'Rajesh Mehta', avatar: 'RM', shift: 'Evening', punchIn: '14:22', punchOut: '-', workingHours: '2h 08m', status: 'Late', inOut: 'IN', department: 'Saree Manufacturing' },
  { id: 8, name: 'Anita Joshi', avatar: 'AJ', shift: 'General', punchIn: '08:58', punchOut: '-', workingHours: '4h 35m', status: 'Present', inOut: 'IN', department: 'Corporate HO' },
];

const statusConfig: Record<LiveStatus, { badge: 'success' | 'warning' | 'error' | 'info' | 'default'; dot: string; icon: typeof Wifi }> = {
  Present: { badge: 'success', dot: 'bg-green-500', icon: Wifi },
  Late: { badge: 'warning', dot: 'bg-amber-500', icon: AlertCircle },
  'On Break': { badge: 'info', dot: 'bg-blue-500', icon: Coffee },
  Absent: { badge: 'error', dot: 'bg-red-500', icon: Circle },
  Offline: { badge: 'default', dot: 'bg-zinc-400', icon: Circle },
};

export default function LiveAttendanceStatus() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LiveStatus | 'All'>('All');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const statusChips: Array<LiveStatus | 'All'> = ['All', 'Present', 'Late', 'On Break', 'Absent', 'Offline'];

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Live Attendance Status</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Auto-refreshing every 30s · Last sync {tick > 0 ? `${tick * 30}s ago` : 'just now'}
          </p>
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {statusChips.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              statusFilter === s
                ? 'bg-[#94cb3d] text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-[480px] overflow-y-auto">
        {filtered.map((r) => {
          const cfg = statusConfig[r.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={r.id} className="flex items-center gap-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 px-2 -mx-2 rounded-lg transition-colors">
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#94cb3d]/10 text-[#94cb3d] flex items-center justify-center font-semibold text-sm">
                  {r.avatar}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-900 ${cfg.dot}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{r.name}</p>
                  <Badge variant={cfg.badge} size="sm">
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {r.status}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {r.department} · {r.shift} Shift
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs">
                <div className="text-center min-w-[60px]">
                  <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase">In</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{r.punchIn}</p>
                </div>
                <div className="text-center min-w-[60px]">
                  <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase">Out</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{r.punchOut}</p>
                </div>
                <div className="text-center min-w-[70px]">
                  <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase">Hours</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{r.workingHours}</p>
                </div>
              </div>

              <div className="shrink-0">
                {r.inOut === 'IN' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-semibold">
                    <LogIn className="h-3 w-3" /> IN
                  </span>
                )}
                {r.inOut === 'OUT' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold">
                    <LogOut className="h-3 w-3" /> OUT
                  </span>
                )}
                {r.inOut === '-' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-semibold">
                    —
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No employees match the filters
          </div>
        )}
      </div>
    </Card>
  );
}
