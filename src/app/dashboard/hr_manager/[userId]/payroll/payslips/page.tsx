'use client';

import { useState } from 'react';
import { Plus, FileSpreadsheet, FileText, Send } from 'lucide-react';
import PayslipFilters from './components/PayslipFilters';
import PayslipSummaryCards from './components/PayslipSummaryCards';
import PayslipsTable from './components/PayslipsTable';
import PayslipViewerDrawer from './components/PayslipViewerDrawer';
import BulkOperations from './components/BulkOperations';
import PayrollProcessingStatus from './components/PayrollProcessingStatus';
import PayslipDeliveryTracking from './components/PayslipDeliveryTracking';
import SalaryBreakdownChart from './components/SalaryBreakdownChart';
import DepartmentPayrollCost from './components/DepartmentPayrollCost';
import PayrollApprovalWorkflow from './components/PayrollApprovalWorkflow';

export default function Page() {
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleGeneratePayslips = () => {
    alert('Generating payslips...');
  };

  const handleBulkGenerate = () => {
    alert('Bulk generating payslips...');
  };

  const handleSendPayslips = () => {
    alert('Sending payslips to employees...');
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handlePayslipClick = (payslip: any) => {
    setSelectedPayslip(payslip);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Payslip Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage, generate, approve, and track employee payslips</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGeneratePayslips}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Generate Payslips
          </button>
          <button
            onClick={handleBulkGenerate}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Bulk Generate
          </button>
          <button
            onClick={handleSendPayslips}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Send className="h-4 w-4" />
            Send Payslips
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
        <PayslipFilters />
      </div>

      {/* Summary Cards */}
      <PayslipSummaryCards />

      {/* Payslips Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <PayslipsTable onPayslipClick={handlePayslipClick} />
      </div>

      {/* Bulk Operations */}
      <BulkOperations />

      {/* Payroll Processing Status */}
      <PayrollProcessingStatus />

      {/* Payslip Delivery Tracking */}
      <PayslipDeliveryTracking />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalaryBreakdownChart />
        <DepartmentPayrollCost />
      </div>

      {/* Payroll Approval Workflow */}
      <PayrollApprovalWorkflow />

      {/* Payslip Viewer Drawer */}
      <PayslipViewerDrawer
        payslip={selectedPayslip}
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedPayslip(null); }}
      />
    </div>
  );
}
