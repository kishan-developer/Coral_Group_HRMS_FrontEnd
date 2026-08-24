'use client';

import { FileText } from 'lucide-react';

export default function ReportTemplates() {
  const templates = [
    'Employee Directory',
    'Department Summary',
    'Payroll Configuration',
    'Leave Policies',
    'Attendance Policies',
    'Role Matrix',
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-purple-500" />
        Report Templates
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Predefined Templates</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => alert(`Using template: ${template}`)}
            className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg text-left hover:border-[#94cb3d] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{template}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Click to use</p>
          </button>
        ))}
      </div>
    </div>
  );
}
