'use client';

import Card from '@/components/ui/Card/Card';
import { Plus, Pencil, Trash2, Copy, UserPlus, Power, LucideIcon } from 'lucide-react';
import { AuditLog } from './shiftsData';

interface Props {
  logs: AuditLog[];
}

const ACTION_CFG: Record<AuditLog['action'], { Icon: LucideIcon; color: string; label: string }> = {
  created:          { Icon: Plus,      color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400', label: 'Created' },
  edited:           { Icon: Pencil,    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',     label: 'Edited' },
  deleted:          { Icon: Trash2,    color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',         label: 'Deleted' },
  duplicated:       { Icon: Copy,      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400', label: 'Duplicated' },
  assigned:         { Icon: UserPlus,  color: 'text-[#94cb3d] bg-[#94cb3d]/10',                                       label: 'Assigned' },
  'status-changed': { Icon: Power,     color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400', label: 'Status Changed' },
};

const fmt = (ts: string) =>
  new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function ShiftAuditLogs({ logs }: Props) {
  const sorted = [...logs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Logs & Audit</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Most recent shift activity</p>
      </div>
      <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {sorted.map((l) => {
          const cfg = ACTION_CFG[l.action];
          const Icon = cfg.Icon;
          return (
            <li key={l.id} className="flex gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-900 dark:text-zinc-50">
                  <span className="font-medium">{l.actor}</span>{' '}
                  <span className="text-zinc-600 dark:text-zinc-400">{cfg.label.toLowerCase()}</span>{' '}
                  <span className="font-medium">{l.shiftName}</span>
                </p>
                {l.detail && <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{l.detail}</p>}
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{fmt(l.timestamp)}</p>
              </div>
            </li>
          );
        })}
        {sorted.length === 0 && <li className="text-sm text-zinc-500 text-center py-6">No audit logs yet.</li>}
      </ul>
    </Card>
  );
}
