'use client';

import { AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface PriorityIssue {
  id: string;
  title: string;
  severity: 'High' | 'Critical';
  type: string;
  assignedTo?: string;
  time: string;
}

interface PriorityIssuesWidgetProps {
  issues?: PriorityIssue[];
}

export default function PriorityIssuesWidget({ issues = [] }: PriorityIssuesWidgetProps) {
  const mockIssues: PriorityIssue[] = issues.length > 0 ? issues : [
    { id: 'ISS-001', title: 'Server down - payroll system', severity: 'Critical', type: 'Technical', assignedTo: 'John Doe', time: '30 min ago' },
    { id: 'ISS-002', title: 'Data sync failure across departments', severity: 'Critical', type: 'Technical', assignedTo: 'Jane Smith', time: '1 hour ago' },
    { id: 'ISS-003', title: 'Multiple login failures reported', severity: 'High', type: 'Security', assignedTo: 'Mike Johnson', time: '2 hours ago' },
    { id: 'ISS-004', title: 'Attendance device malfunction', severity: 'High', type: 'Hardware', time: '3 hours ago' },
  ];

  const severityIcons = {
    Critical: <XCircle className="h-5 w-5 text-red-500" />,
    High: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  };

  const severityColors = {
    Critical: 'border-l-red-500 bg-red-50 dark:bg-red-900/10',
    High: 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10',
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Priority Issues
        </h3>
        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full font-medium">
          {mockIssues.length} Active
        </span>
      </div>
      
      <div className="space-y-3">
        {mockIssues.map((issue) => (
          <div key={issue.id} className={`p-4 rounded-lg border-l-4 ${severityColors[issue.severity]}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{severityIcons[issue.severity]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{issue.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    issue.severity === 'Critical' 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{issue.title}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{issue.type}</span>
                  {issue.assignedTo && (
                    <>
                      <span className="text-xs text-zinc-400">•</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">Assigned: {issue.assignedTo}</span>
                    </>
                  )}
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{issue.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
