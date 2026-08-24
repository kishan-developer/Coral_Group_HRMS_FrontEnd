'use client';

import { Calendar, Mail, FileText } from 'lucide-react';

export default function ScheduledMasterReports() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-500" />
        Scheduled Reports
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Generate and send reports automatically</p>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Frequencies</p>
          <div className="flex flex-wrap gap-2">
            {['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((freq) => (
              <label key={freq} className="flex items-center gap-2 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{freq}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Delivery</p>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <input type="checkbox" className="rounded" />
              <Mail className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Email</span>
            </label>
            <label className="flex items-center gap-2 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <input type="checkbox" className="rounded" />
              <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">PDF Attachment</span>
            </label>
            <label className="flex items-center gap-2 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <input type="checkbox" className="rounded" />
              <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Excel Attachment</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
