import { Plus, Upload, Users } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { label: 'Add Employee', href: '/dashboard/admin/employees/add', icon: Plus },
  { label: 'Bulk Upload', href: '/dashboard/admin/employees', icon: Upload },
  { label: 'View Team', href: '/dashboard/admin/employees', icon: Users },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 hover:border-[#94cb3d] hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#94cb3d]/10 text-[#94cb3d]">
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
