'use client';

import { AlertTriangle } from 'lucide-react';

export default function DataIntegrityReport() {
  const issues = [
    { name: 'Missing Department Head', count: '3 Departments', severity: 'warning' },
    { name: 'Employees Without Manager', count: '5 Employees', severity: 'warning' },
    { name: 'Invalid Salary Structure', count: '2 Records', severity: 'error' },
    { name: 'Duplicate Entries', count: '1 Record', severity: 'error' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-zinc-600 bg-zinc-50 dark:bg-zinc-800';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        Data Integrity Report
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Identify configuration issues</p>

      <div className="space-y-3">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getSeverityColor(issue.severity)}`}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{issue.name}</span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{issue.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
