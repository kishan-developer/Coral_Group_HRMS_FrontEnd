'use client';

import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import { CheckCircle, XCircle, Clock, Download, Edit } from 'lucide-react';

interface QuickActionsProps {
  onMarkAttendance: () => void;
  onApproveLeave: () => void;
  onRejectLeave: () => void;
  onRegularization: () => void;
  onDownloadReport: () => void;
}

export default function QuickActions({
  onMarkAttendance,
  onApproveLeave,
  onRejectLeave,
  onRegularization,
  onDownloadReport,
}: QuickActionsProps) {
  const actions = [
    {
      icon: Edit,
      label: 'Mark Attendance',
      description: 'Bulk or manual attendance entry',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      onClick: onMarkAttendance,
    },
    {
      icon: CheckCircle,
      label: 'Approve Leave',
      description: 'Review and approve requests',
      count: 5,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      onClick: onApproveLeave,
    },
    {
      icon: XCircle,
      label: 'Reject Leave',
      description: 'Review and reject requests',
      count: 2,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      onClick: onRejectLeave,
    },
    {
      icon: Clock,
      label: 'Regularization',
      description: 'Review attendance corrections',
      count: 3,
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      onClick: onRegularization,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d] hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-center justify-between w-full">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                {action.count !== undefined && (
                  <span className="text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {action.count}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {action.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <Button variant="primary" size="md" className="w-full" onClick={onDownloadReport}>
          <Download className="h-4 w-4" />
          Download Monthly Report
        </Button>
      </div>
    </Card>
  );
}
