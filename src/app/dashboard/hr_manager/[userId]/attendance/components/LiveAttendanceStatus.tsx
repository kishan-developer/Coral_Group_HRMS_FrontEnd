'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Wifi, Coffee, LogIn, LogOut, AlertCircle, Circle, RefreshCw, Filter, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type LiveStatus = 'Present' | 'Late' | 'On Break' | 'Absent' | 'Offline';

interface LiveRecord {
  id: number | string;
  name: string;
  avatar: string;
  shift: string;
  punchIn: string;
  punchOut: string;
  workingHours: string;
  status: LiveStatus;
  inOut: 'IN' | 'OUT' | '-';
  department: string;
  location?: string;
}

const records: LiveRecord[] = [
  { id: 1, name: 'Rahul Sharma', avatar: 'RS', shift: 'General Shift', punchIn: '09:01 AM', punchOut: '—', workingHours: '4h 32m', status: 'Present', inOut: 'IN', department: 'Real Estate & Infra', location: 'Site A - Bandra Kurla' },
  { id: 2, name: 'Priya Patel', avatar: 'PP', shift: 'General Shift', punchIn: '08:55 AM', punchOut: '—', workingHours: '4h 38m', status: 'Present', inOut: 'IN', department: 'Hotels & Hospitality', location: 'Hotel Blue Front Desk' },
  { id: 3, name: 'Sneha Gupta', avatar: 'SG', shift: 'General Shift', punchIn: '09:18 AM', punchOut: '—', workingHours: '4h 15m', status: 'Late', inOut: 'IN', department: 'Corporate Head Office', location: 'HO Main Building' },
  { id: 4, name: 'Vikram Malhotra', avatar: 'VM', shift: 'Morning Shift', punchIn: '06:02 AM', punchOut: '—', workingHours: '7h 28m', status: 'On Break', inOut: 'IN', department: 'Real Estate & Infra', location: 'Site B - Worli High' },
  { id: 5, name: 'Amit Kumar', avatar: 'AK', shift: 'General Shift', punchIn: '—', punchOut: '—', workingHours: '0h 00m', status: 'Absent', inOut: '-', department: 'Saree Manufacturing', location: 'Factory Unit 1' },
  { id: 6, name: 'Neha Desai', avatar: 'ND', shift: 'General Shift', punchIn: '08:48 AM', punchOut: '05:45 PM', workingHours: '8h 57m', status: 'Offline', inOut: 'OUT', department: 'Hotels & Hospitality', location: 'Hotel Grand Lobby' },
  { id: 7, name: 'Rajesh Mehta', avatar: 'RM', shift: 'Evening Shift', punchIn: '02:22 PM', punchOut: '—', workingHours: '2h 08m', status: 'Late', inOut: 'IN', department: 'Saree Manufacturing', location: 'Textile Unit 2' },
  { id: 8, name: 'Anita Joshi', avatar: 'AJ', shift: 'General Shift', punchIn: '08:58 AM', punchOut: '—', workingHours: '4h 35m', status: 'Present', inOut: 'IN', department: 'Corporate Head Office', location: 'HO Board Room' },
];

export default function LiveAttendanceStatus() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LiveStatus | 'All'>('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [tick, setTick] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState<LiveRecord | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.department.toLowerCase().includes(search.toLowerCase()) ||
        (r.location || '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesDept = departmentFilter === 'All' || r.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [search, statusFilter, departmentFilter]);

  const counts = {
    All: records.length,
    Present: records.filter((r) => r.status === 'Present').length,
    Late: records.filter((r) => r.status === 'Late').length,
    'On Break': records.filter((r) => r.status === 'On Break').length,
    Absent: records.filter((r) => r.status === 'Absent').length,
    Offline: records.filter((r) => r.status === 'Offline').length,
  };

  const statusChips: Array<LiveStatus | 'All'> = ['All', 'Present', 'Late', 'On Break', 'Absent', 'Offline'];

  return (
    <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans">
      <CardContent className="p-6 space-y-5">
        {/* Header Title & Sync Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                Live Attendance & Punch Status Stream
              </h3>
              <Badge variant="brand" className="text-[10px]">
                {filtered.length} Employees Monitored
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-[#94cb3d] animate-spin" />
              <span>Auto-refreshing every 30s · Sync {tick > 0 ? `${tick * 30}s ago` : 'active now'}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employee, site, or department..."
                className="pl-10 rounded-xl text-xs font-medium"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="All">All Departments</option>
              <option value="Real Estate & Infra">Real Estate & Infra</option>
              <option value="Hotels & Hospitality">Hotels & Hospitality</option>
              <option value="Saree Manufacturing">Saree Manufacturing</option>
              <option value="Corporate Head Office">Corporate Head Office</option>
            </select>
          </div>
        </div>

        {/* Filter Pills with Live Counter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusChips.map((s) => {
            const isActive = statusFilter === s;
            const count = counts[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
                  isActive
                    ? 'bg-[#94cb3d] text-zinc-950 border-[#94cb3d] shadow-md shadow-[#94cb3d]/20 font-extrabold'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850'
                }`}
              >
                <span>{s}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
                    isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Master Live Data Table */}
        <div className="overflow-x-auto border border-zinc-200/80 dark:border-zinc-800 rounded-2xl">
          <table className="w-full text-left font-medium text-xs">
            <thead className="bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Employee Name</th>
                <th className="px-4 py-3.5">Department & Shift</th>
                <th className="px-4 py-3.5">Punch In</th>
                <th className="px-4 py-3.5">Punch Out</th>
                <th className="px-4 py-3.5">Working Duration</th>
                <th className="px-4 py-3.5">Location / Site</th>
                <th className="px-4 py-3.5">Live Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{r.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">ID: EMP-{1000 + Number(r.id)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{r.department}</p>
                    <p className="text-[10px] text-zinc-500">{r.shift}</p>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <LogIn className="h-3.5 w-3.5" />
                      {r.punchIn}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-xs text-zinc-500">
                    {r.punchOut}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {r.workingHours}
                  </td>

                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="h-3 w-3 text-purple-500 shrink-0" />
                      {r.location || 'HQ'}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <Badge
                      variant={
                        r.status === 'Present'
                          ? 'success'
                          : r.status === 'Late'
                          ? 'warning'
                          : r.status === 'On Break'
                          ? 'secondary'
                          : r.status === 'Absent'
                          ? 'destructive'
                          : 'outline'
                      }
                      className="text-[10px] font-bold"
                    >
                      {r.status}
                    </Badge>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRecord(r)}
                      className="h-8 px-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#94cb3d] hover:text-zinc-950 flex items-center gap-1.5 text-xs font-bold transition-all ml-auto"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Logs</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs font-bold text-zinc-400">
                    No active punch records match your search filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Inspect Log Drawer Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                Attendance Audit Log: {selectedRecord.name}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Department:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedRecord.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Assigned Shift:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedRecord.shift}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">First Punch In:</span>
                <span className="font-mono font-bold text-emerald-600">{selectedRecord.punchIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Last Punch Out:</span>
                <span className="font-mono font-bold text-zinc-600">{selectedRecord.punchOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Active Location:</span>
                <span className="font-medium text-purple-600">{selectedRecord.location}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2">
                <span className="text-zinc-500 font-bold">Total Logged Hours:</span>
                <span className="font-mono font-extrabold text-zinc-900 dark:text-zinc-50">{selectedRecord.workingHours}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setSelectedRecord(null)}
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl text-xs px-4"
              >
                Close Audit View
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
