'use client';

import { Download, FileSpreadsheet, FileText, Mail, Printer } from 'lucide-react';

export default function LeaveExportReports() {
  const handleDownloadExcel = () => {
    alert('Downloading Excel report...');
  };

  const handleDownloadPDF = () => {
    alert('Downloading PDF report...');
  };

  const handleEmailReport = () => {
    alert('Sending email report...');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownloadExcel}
        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Download Excel"
      >
        <FileSpreadsheet className="h-4 w-4" />
        <span className="hidden sm:inline">Excel</span>
      </button>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Download PDF"
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>
      <button
        onClick={handleEmailReport}
        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Email Report"
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">Email</span>
      </button>
      <button
        onClick={handlePrintReport}
        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Print Report"
      >
        <Printer className="h-4 w-4" />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
}
