'use client';

import { useState } from 'react';
import { AlertTriangle, Eye, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const initialAlerts = [
  { id: 1, type: 'Missing Attendance Sync', detail: 'Biometric server disconnected for 4 staff members in Real Estate site', severity: 'warning' as const, vertical: 'Real Estate & Infra', date: '10m ago' },
  { id: 2, type: 'Geofence Mismatch', detail: 'GPS check-in location outside assigned hotel property boundary', severity: 'error' as const, vertical: 'Hotels & Hospitality', date: '25m ago' },
  { id: 3, type: 'Facial Verification Fail', detail: 'Photo match score below 85% threshold for 2 morning check-ins', severity: 'warning' as const, vertical: 'Saree Manufacturing', date: '1h ago' },
  { id: 4, type: 'Work Permit Expiring', detail: '3 employee statutory IDs and work permits expiring within 7 days', severity: 'info' as const, vertical: 'Corporate Head Office', date: '2h ago' },
  { id: 5, type: 'Mobile Sync Latency', detail: 'Field agent mobile app sync delayed by 45 minutes', severity: 'warning' as const, vertical: 'Real Estate & Infra', date: '3h ago' },
];

export default function AlertsTable() {
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<typeof initialAlerts[0] | null>(null);

  const handleResolveAlert = (id: number) => {
    setAlertsList((prev) => prev.filter((a) => a.id !== id));
    setSelectedAlert(null);
  };

  return (
    <Card id="compliance-alerts-section" className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
            System Compliance Alerts & Policy Notifications
          </h3>
        </div>
        <Badge variant="brand" className="text-[10px]">
          {alertsList.length} Open Alerts
        </Badge>
      </div>

      {selectedAlert && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>{selectedAlert.type}: {selectedAlert.detail}</span>
            </p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              Vertical: {selectedAlert.vertical} • Time: {selectedAlert.date}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => handleResolveAlert(selectedAlert.id)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolve Issue
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedAlert(null)}
              className="rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left font-medium text-xs">
          <thead className="bg-zinc-50/50 dark:bg-zinc-900 text-zinc-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3.5">Alert Type</th>
              <th className="px-4 py-3.5">Incident Details</th>
              <th className="px-4 py-3.5">Business Vertical</th>
              <th className="px-4 py-3.5">Severity</th>
              <th className="px-4 py-3.5">Time Logged</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {alertsList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-zinc-400 text-xs font-bold">
                  All compliance alerts have been resolved cleanly!
                </td>
              </tr>
            ) : (
              alertsList.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{a.type}</td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-medium max-w-xs truncate">{a.detail}</td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400">{a.vertical}</td>
                  <td className="px-4 py-3.5">
                    <Badge
                      variant={
                        a.severity === 'error'
                          ? 'destructive'
                          : a.severity === 'warning'
                          ? 'brand'
                          : 'secondary'
                      }
                      className="text-[10px] font-bold"
                    >
                      {a.severity.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-500 font-mono text-[11px]">{a.date}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedAlert(a)}
                      className="h-8 px-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#94cb3d] hover:text-zinc-950 flex items-center gap-1.5 text-xs font-bold transition-all ml-auto"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
