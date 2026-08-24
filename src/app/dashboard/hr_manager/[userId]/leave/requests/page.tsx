'use client';

import { useState } from 'react';
import { Check, X, Download, FileSpreadsheet, FileText } from 'lucide-react';
import LeaveRequestsFilters from './components/LeaveRequestsFilters';
import LeaveRequestsSummaryCards from './components/LeaveRequestsSummaryCards';
import LeaveRequestsStatusTabs from './components/LeaveRequestsStatusTabs';
import LeaveRequestsTable from './components/LeaveRequestsTable';
import LeaveRequestDetailDrawer from './components/LeaveRequestDetailDrawer';

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBulkApprove = () => {
    alert(`Approving ${selectedRequests.length} requests`);
  };

  const handleBulkReject = () => {
    alert(`Rejecting ${selectedRequests.length} requests`);
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handleRequestClick = (request: any) => {
    setSelectedRequest(request);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Leave Requests</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage employee leave applications, approvals, and rejections</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedRequests.length > 0 && (
            <>
              <button
                onClick={handleBulkApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <Check className="h-4 w-4" />
                Approve Selected ({selectedRequests.length})
              </button>
              <button
                onClick={handleBulkReject}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
                Reject Selected ({selectedRequests.length})
              </button>
            </>
          )}
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
        <LeaveRequestsFilters />
      </div>

      {/* Summary Cards */}
      <LeaveRequestsSummaryCards />

      {/* Status Tabs */}
      <LeaveRequestsStatusTabs
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Leave Requests Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeaveRequestsTable
          selectedStatus={selectedStatus}
          selectedRequests={selectedRequests}
          onSelectionChange={setSelectedRequests}
          onRequestClick={handleRequestClick}
        />
      </div>

      {/* Request Detail Drawer */}
      <LeaveRequestDetailDrawer
        request={selectedRequest}
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedRequest(null); }}
      />
    </div>
  );
}
