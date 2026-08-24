'use client';

import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function ApprovalWorkflowPanel() {
  const workflowLevels = [
    { id: 1, title: 'Level 1', approver: 'Reporting Manager', status: 'approved' },
    { id: 2, title: 'Level 2', approver: 'HR Manager', status: 'approved' },
    { id: 3, title: 'Level 3', approver: 'Admin Approval', status: 'pending' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Shield className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-zinc-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-purple-500" />
        Approval Workflow Panel
      </h3>
      <div className="space-y-3">
        {workflowLevels.map((level) => (
          <div key={level.id} className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(level.status)}
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{level.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{level.approver}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(level.status)}`}>
              {level.status.charAt(0).toUpperCase() + level.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
