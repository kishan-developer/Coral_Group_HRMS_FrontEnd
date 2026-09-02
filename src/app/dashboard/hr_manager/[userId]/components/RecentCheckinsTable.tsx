'use client';

import { Clock, MapPin, Fingerprint, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CheckinItem {
  id: string | number;
  name: string;
  time: string;
  type: string;
  status: string;
  location: string;
}

interface RecentCheckinsTableProps {
  checkins?: CheckinItem[];
}

const defaultCheckins: CheckinItem[] = [
  { id: '1', name: 'Rahul Sharma', time: '09:01 AM', type: 'GPS', status: 'On Time', location: 'Site A - Bandra Kurla Field' },
  { id: '2', name: 'Priya Patel', time: '09:05 AM', type: 'Biometric', status: 'On Time', location: 'Hotel Blue Front Desk' },
  { id: '3', name: 'Amit Kumar', time: '09:22 AM', type: 'Biometric', status: 'Late', location: 'Factory 1 Saree Mfg Unit' },
  { id: '4', name: 'Sneha Gupta', time: '08:55 AM', type: 'Biometric', status: 'On Time', location: 'Corporate HO Main Building' },
  { id: '5', name: 'Vikram Malhotra', time: '09:18 AM', type: 'GPS', status: 'Late', location: 'Site B - Worli High Street' },
];

export default function RecentCheckinsTable({ checkins }: RecentCheckinsTableProps) {
  const checkinsList = checkins && checkins.length > 0 ? checkins : defaultCheckins;

  return (
    <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Fingerprint className="h-4 w-4 text-[#94cb3d]" />
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
            Real-Time Punch Activity & Biometric Stream
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Stream Active</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-medium text-xs">
          <thead className="bg-zinc-50/50 dark:bg-zinc-900 text-zinc-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3.5">Employee</th>
              <th className="px-4 py-3.5">Punch Time</th>
              <th className="px-4 py-3.5">Verification Method</th>
              <th className="px-4 py-3.5">Punctuality Status</th>
              <th className="px-4 py-3.5">Punch Site / Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {checkinsList.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#94cb3d]/15 text-[#94cb3d] font-bold text-[10px] flex items-center justify-center">
                      {c.name[0]?.toUpperCase()}
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{c.name}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
                  {c.time}
                </td>

                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {c.type === 'GPS' ? (
                      <MapPin className="h-3 w-3 text-purple-500" />
                    ) : (
                      <Fingerprint className="h-3 w-3 text-emerald-500" />
                    )}
                    {c.type}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <Badge
                    variant={c.status === 'On Time' ? 'success' : 'brand'}
                    className="text-[10px] font-bold"
                  >
                    {c.status}
                  </Badge>
                </td>

                <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-medium">
                  {c.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
