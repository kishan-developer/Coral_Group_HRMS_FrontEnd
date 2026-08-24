'use client';

import Modal from '@/components/ui/Modal/Modal';
import { LogIn, LogOut, Coffee, Wifi } from 'lucide-react';
import { DailyAttendanceRow } from './dailyData';

interface Props {
  row: DailyAttendanceRow | null;
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  time: string;
  type: 'in' | 'out' | 'break-start' | 'break-end';
  device: string;
}

const buildLogs = (row: DailyAttendanceRow): LogEntry[] => {
  if (!row.inTime) return [];
  const logs: LogEntry[] = [{ time: row.inTime, type: 'in', device: 'Biometric — Main Gate' }];
  logs.push({ time: '13:05', type: 'break-start', device: 'Mobile App' });
  logs.push({ time: '13:38', type: 'break-end', device: 'Mobile App' });
  if (row.outTime) {
    logs.push({ time: row.outTime, type: 'out', device: 'Biometric — Main Gate' });
  }
  return logs;
};

const ICONS = {
  in: { Icon: LogIn, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400', label: 'Punch In' },
  out: { Icon: LogOut, color: 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300', label: 'Punch Out' },
  'break-start': { Icon: Coffee, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400', label: 'Break Start' },
  'break-end': { Icon: Wifi, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400', label: 'Break End' },
};

export default function EmployeeLogsModal({ row, isOpen, onClose }: Props) {
  if (!row) return null;
  const logs = buildLogs(row);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Punch Logs — ${row.name}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="h-10 w-10 rounded-full bg-[#94cb3d]/10 text-[#94cb3d] flex items-center justify-center font-semibold">
            {row.avatar}
          </div>
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">{row.name} · {row.empId}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{row.department} · {row.shift} ({row.shiftStart} – {row.shiftEnd})</p>
          </div>
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 py-6 text-center">No punch logs recorded for today.</p>
        ) : (
          <ul className="space-y-3">
            {logs.map((l, i) => {
              const cfg = ICONS[l.type];
              const Icon = cfg.Icon;
              return (
                <li key={i} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cfg.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{cfg.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{l.device}</p>
                  </div>
                  <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{l.time}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
}
