'use client';

import { MapPin, Navigation, ShieldAlert, Wifi, BatteryCharging, CheckCircle2, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GpsSummary() {
  const activeGpsUsers = [
    { name: 'Rahul Sharma', site: 'Site A - Bandra Kurla Complex', time: '2m ago', coords: '19.065, 72.868', status: 'In-Fence', battery: '92%' },
    { name: 'Vikram Malhotra', site: 'Site B - Worli High Street', time: '5m ago', coords: '18.998, 72.815', status: 'In-Fence', battery: '78%' },
    { name: 'Priya Patel', site: 'Client Meeting - Lower Parel', time: '12m ago', coords: '18.993, 72.829', status: 'On Field', battery: '85%' },
  ];

  return (
    <div className="space-y-4 font-sans">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Active GPS Users</span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">142 Users</h3>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
              <Wifi className="h-3.5 w-3.5" /> High Precision GPS
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">In-Transit Field Staff</span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Navigation className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">18 Staff</h3>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Live Navigation Sync
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Geofence Violations</span>
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">0 Active</h3>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Site Compliance
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Telemetry Sync</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <RefreshCw className="h-5 w-5 animate-spin" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Real-Time</h3>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              Updated 2m ago
            </p>
          </div>
        </div>
      </div>

      {/* Live GPS Telemetry Table */}
      <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Live Geofenced Field Worker Telemetry
              </span>
            </div>
            <Badge variant="brand" className="text-[10px]">3 Field Trackers Online</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium text-xs">
              <thead className="bg-zinc-50/50 dark:bg-zinc-900 text-zinc-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Field Employee</th>
                  <th className="px-4 py-3">Assigned Site / Location</th>
                  <th className="px-4 py-3">Coordinates (Lat, Lng)</th>
                  <th className="px-4 py-3">Geofence Status</th>
                  <th className="px-4 py-3">Battery</th>
                  <th className="px-4 py-3 text-right">Ping Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {activeGpsUsers.map((u, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100">{u.name}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 font-medium">{u.site}</td>
                    <td className="px-4 py-3 text-zinc-500 font-mono text-[11px]">{u.coords}</td>
                    <td className="px-4 py-3">
                      <Badge variant="success" className="text-[10px] font-bold">{u.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 font-mono">{u.battery}</td>
                    <td className="px-4 py-3 text-right font-mono text-zinc-500">{u.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
