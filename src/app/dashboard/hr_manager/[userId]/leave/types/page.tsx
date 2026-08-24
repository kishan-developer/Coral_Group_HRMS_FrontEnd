'use client';

import { useState } from 'react';
import { Plus, FileSpreadsheet, FileText, Search } from 'lucide-react';
import LeaveTypesSummaryCards from './components/LeaveTypesSummaryCards';
import LeaveTypesTable from './components/LeaveTypesTable';
import LeaveTypeCategories from './components/LeaveTypeCategories';
import LeaveTypeModal from './components/LeaveTypeModal';
import LeaveTypeUsageStatistics from './components/LeaveTypeUsageStatistics';
import LeaveTypeDetailsDrawer from './components/LeaveTypeDetailsDrawer';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddLeaveType = () => {
    setSelectedLeaveType(null);
    setIsModalOpen(true);
  };

  const handleEditLeaveType = (leaveType: any) => {
    setSelectedLeaveType(leaveType);
    setIsModalOpen(true);
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handleImportLeaveTypes = () => {
    alert('Import leave types...');
  };

  const handleLeaveTypeClick = (leaveType: any) => {
    setSelectedLeaveType(leaveType);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Leave Types</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and configure leave categories for the organization</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddLeaveType}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Leave Type
          </button>
          <button
            onClick={handleImportLeaveTypes}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Import Leave Types
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search Leave Type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
      </div>

      {/* Summary Cards */}
      <LeaveTypesSummaryCards />

      {/* Leave Types Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeaveTypesTable
          searchQuery={searchQuery}
          onEdit={handleEditLeaveType}
          onView={handleLeaveTypeClick}
        />
      </div>

      {/* Leave Type Categories */}
      <LeaveTypeCategories />

      {/* Leave Type Usage Statistics */}
      <LeaveTypeUsageStatistics />

      {/* Add/Edit Leave Type Modal */}
      <LeaveTypeModal
        leaveType={selectedLeaveType}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedLeaveType(null); }}
      />

      {/* Leave Type Details Drawer */}
      <LeaveTypeDetailsDrawer
        leaveType={selectedLeaveType}
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedLeaveType(null); }}
      />
    </div>
  );
}
