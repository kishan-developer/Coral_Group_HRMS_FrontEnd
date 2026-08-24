'use client';

import { Clock, MapPin } from 'lucide-react';
import Badge from '@/components/ui/Badge/Badge';
import Card from '@/components/ui/Card/Card';

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
  { id: '1', name: 'Rahul Sharma', time: '09:01 AM', type: 'GPS', status: 'On Time', location: 'Site A - Field Location' },
  { id: '2', name: 'Priya Patel', time: '09:05 AM', type: 'Biometric', status: 'On Time', location: 'Hotel Blue Front Desk' },
  { id: '3', name: 'Amit Kumar', time: '09:22 AM', type: 'Biometric', status: 'Late', location: 'Factory 1 Office' },
  { id: '4', name: 'Sneha Gupta', time: '08:55 AM', type: 'Biometric', status: 'On Time', location: 'HO Main Building' },
  { id: '5', name: 'Vikram Rao', time: '09:18 AM', type: 'GPS', status: 'Late', location: 'Site B - Construction' },
];

export default function RecentCheckinsTable({ checkins }: RecentCheckinsTableProps) {
  const checkinsList = checkins && checkins.length > 0 ? checkins : defaultCheckins;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Recent Check-ins</h3>
        <Badge variant="success" size="sm">Live</Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-800 text-xs uppercase text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {checkinsList.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">{c.name}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{c.time}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {c.type === 'GPS' ? <MapPin className="h-3 w-3 text-purple-500" /> : <Clock className="h-3 w-3 text-emerald-500" />}
                    {c.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={c.status === 'On Time' ? 'success' : 'warning'} size="sm">
                    {c.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
