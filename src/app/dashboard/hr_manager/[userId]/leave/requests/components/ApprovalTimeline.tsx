'use client';

import { CheckCircle, Clock, XCircle } from 'lucide-react';

export default function ApprovalTimeline() {
  const timelineSteps = [
    { id: 1, title: 'Request Submitted', status: 'completed', date: '28 May 2024, 10:30 AM', actor: 'Rahul Sharma' },
    { id: 2, title: 'Manager Review', status: 'completed', date: '28 May 2024, 2:45 PM', actor: 'John Manager' },
    { id: 3, title: 'HR Review', status: 'completed', date: '29 May 2024, 11:20 AM', actor: 'Sarah HR' },
    { id: 4, title: 'Final Approval', status: 'pending', date: '', actor: '' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-zinc-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'pending':
        return 'border-amber-500';
      case 'rejected':
        return 'border-red-500';
      default:
        return 'border-zinc-300';
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Approval Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-700" />
        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="relative flex items-start gap-4">
              <div className={`relative z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 ${getStatusColor(step.status)} flex items-center justify-center`}>
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{step.title}</p>
                {step.date && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{step.date}</p>
                )}
                {step.actor && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">By {step.actor}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
