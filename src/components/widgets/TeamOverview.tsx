import { ArrowRight, UserCircle } from 'lucide-react';
import Link from 'next/link';

const members = [
  { id: 1, name: 'John Doe', role: 'Senior Developer', status: 'Present', avatar: 'JD' },
  { id: 2, name: 'Sarah Williams', role: 'HR Manager', status: 'Present', avatar: 'SW' },
  { id: 3, name: 'Mike Chen', role: 'Designer', status: 'On Leave', avatar: 'MC' },
  { id: 4, name: 'Emily Davis', role: 'Accountant', status: 'Late', avatar: 'ED' },
];

export default function TeamOverview() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Team Overview</h3>
        <Link href="/dashboard/admin/employees" className="text-xs font-medium text-[#94cb3d] hover:underline flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {m.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{m.name}</p>
                <p className="text-xs text-zinc-500">{m.role}</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                m.status === 'Present'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : m.status === 'On Leave'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
