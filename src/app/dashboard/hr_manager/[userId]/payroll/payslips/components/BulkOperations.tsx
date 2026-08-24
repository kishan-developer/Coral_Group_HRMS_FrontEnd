'use client';

import { Layers, Send, Download, Lock } from 'lucide-react';

export default function BulkOperations() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-blue-500" />
        Bulk Operations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Generate Payslips */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Generate Payslips</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Select Month</label>
              <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100">
                <option>May 2026</option>
                <option>April 2026</option>
              </select>
            </div>
            <button
              onClick={() => alert('Generating payslips...')}
              className="w-full px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Bulk Send */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Send className="h-4 w-4 text-blue-500" />
            Bulk Send
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">Send all payslips via email</p>
          <button
            onClick={() => alert('Sending payslips...')}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Send All Payslips
          </button>
        </div>

        {/* Bulk Download */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Download className="h-4 w-4 text-green-500" />
            Bulk Download ZIP
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">Download all payslips as ZIP</p>
          <button
            onClick={() => alert('Downloading ZIP...')}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Download All
          </button>
        </div>

        {/* Bulk Lock */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4 text-red-500" />
            Bulk Lock
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">Lock payroll records</p>
          <button
            onClick={() => alert('Locking payroll...')}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Lock Payroll
          </button>
        </div>
      </div>
    </div>
  );
}
