'use client';

import { useState } from 'react';
import { Plus, FileSpreadsheet, FileText, Search } from 'lucide-react';
import PayrollFilters from './components/PayrollFilters';
import PayrollSummaryCards from './components/PayrollSummaryCards';
import PayrollTable from './components/PayrollTable';
import PayrollDetailsDrawer from './components/PayrollDetailsDrawer';

export default function Page() {
  const [selectedMonth, setSelectedMonth] = useState('2024-05');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handleProcessPayroll = () => {
    alert('Processing payroll...');
  };

  const handlePayrollClick = (payroll: any) => {
    setSelectedPayroll(payroll);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Monthly Payroll</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and process monthly employee payroll</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleProcessPayroll}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Process Payroll
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <PayrollFilters selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
      </div>

      {/* Summary Cards */}
      <PayrollSummaryCards />

      {/* Payroll Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <PayrollTable
          selectedMonth={selectedMonth}
          searchQuery={searchQuery}
          onPayrollClick={handlePayrollClick}
        />
      </div>

      {/* Payroll Details Drawer */}
      <PayrollDetailsDrawer
        payroll={selectedPayroll}
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedPayroll(null); }}
      />
    </div>
  );
}
