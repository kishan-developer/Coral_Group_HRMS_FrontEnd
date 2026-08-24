'use client';

import { Plus, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import MasterReportsFilters from './components/MasterReportsFilters';
import MasterSummaryCards from './components/MasterSummaryCards';
import MasterReportCategories from './components/MasterReportCategories';
import MasterReportsGrid from './components/MasterReportsGrid';
import EmployeeMasterReport from './components/EmployeeMasterReport';
import DepartmentMasterReport from './components/DepartmentMasterReport';
import DesignationMasterReport from './components/DesignationMasterReport';
import ShiftMasterReport from './components/ShiftMasterReport';
import LeaveMasterReport from './components/LeaveMasterReport';
import PayrollMasterReport from './components/PayrollMasterReport';
import MasterDataAuditReport from './components/MasterDataAuditReport';
import DataIntegrityReport from './components/DataIntegrityReport';
import ScheduledMasterReports from './components/ScheduledMasterReports';
import ReportTemplates from './components/ReportTemplates';

export default function Page() {
  const handleGenerateReport = () => {
    alert('Generating report...');
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handlePrintReport = () => {
    alert('Printing report...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Master Reports</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Centralized reporting for all master records in the HRMS system</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Generate Report
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
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <MasterReportsFilters />
      </div>

      {/* Summary Cards */}
      <MasterSummaryCards />

      {/* Report Categories */}
      <MasterReportCategories />

      {/* Master Reports Grid */}
      <MasterReportsGrid />

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeMasterReport />
        <DepartmentMasterReport />
        <DesignationMasterReport />
        <ShiftMasterReport />
        <LeaveMasterReport />
        <PayrollMasterReport />
      </div>

      {/* Audit & Integrity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MasterDataAuditReport />
        <DataIntegrityReport />
      </div>

      {/* Scheduled Reports */}
      <ScheduledMasterReports />

      {/* Report Templates */}
      <ReportTemplates />
    </div>
  );
}
