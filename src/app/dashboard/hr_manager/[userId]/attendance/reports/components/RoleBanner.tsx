'use client';

import { ShieldCheck, Eye, Users } from 'lucide-react';
import { Role } from './reportsData';

const ROLE_CFG: Record<Role, { label: string; desc: string; icon: typeof ShieldCheck; color: string }> = {
  admin:   { label: 'Admin',   desc: 'Full access — view, export, schedule and modify reports',     icon: ShieldCheck, color: 'bg-[#94cb3d]/10 text-[#94cb3d] border-[#94cb3d]/30' },
  hr:      { label: 'HR',      desc: 'Report viewing & exporting across all departments',           icon: Eye,         color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  manager: { label: 'Manager', desc: 'Department-specific view only',                               icon: Users,       color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
};

interface Props {
  role: Role;
  onRoleChange: (r: Role) => void;
}

export default function RoleBanner({ role, onRoleChange }: Props) {
  const cfg = ROLE_CFG[role];
  const Icon = cfg.icon;
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 ${cfg.color}`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <div>
          <p className="text-sm font-semibold">Viewing as {cfg.label}</p>
          <p className="text-xs opacity-80">{cfg.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="opacity-70">Preview as:</span>
        {(['admin', 'hr', 'manager'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onRoleChange(r)}
            className={`px-2.5 py-1 rounded-md font-medium border transition-colors ${role === r ? 'bg-white dark:bg-zinc-900 border-current' : 'border-transparent hover:bg-white/40 dark:hover:bg-zinc-900/40'}`}
          >
            {ROLE_CFG[r].label}
          </button>
        ))}
      </div>
    </div>
  );
}
