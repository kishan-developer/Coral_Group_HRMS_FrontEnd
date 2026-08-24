'use client';

import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import LeaveFilters from './components/LeaveFilters';
import LeaveSummaryCards from './components/LeaveSummaryCards';
import LeaveRequestsTable from './components/LeaveRequestsTable';
import LeaveCalendarView from './components/LeaveCalendarView';
import LeaveStatistics from './components/LeaveStatistics';
import EmployeeLeaveBalance from './components/EmployeeLeaveBalance';
import LeavePolicyManagement from './components/LeavePolicyManagement';
import EmployeesCurrentlyOnLeave from './components/EmployeesCurrentlyOnLeave';
import LeaveApprovalPanel from './components/LeaveApprovalPanel';
import HolidayManagement from './components/HolidayManagement';
import LeaveReports from './components/LeaveReports';
import LeaveExportReports from './components/LeaveExportReports';

export default function Page() {
  const [dateRange, setDateRange] = useState('month');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<any>(null);
  const [isApprovalPanelOpen, setIsApprovalPanelOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  const handleLeaveRequestClick = (request: any) => {
    setSelectedLeaveRequest(request);
    setIsApprovalPanelOpen(true);
  };

  const handleCreateLeaveRequest = () => {
    alert('Create Leave Request modal would open here');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Leave Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage employee leave requests, approvals, balances, and policies</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPolicyModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Leave Policy Settings
          </button>
          <button
            onClick={handleCreateLeaveRequest}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Leave Request
          </button>
        </div>
      </div>

      {/* Export Reports */}
      <div className="flex justify-end">
        <LeaveExportReports />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <LeaveFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedEmployee={selectedEmployee}
          onEmployeeChange={setSelectedEmployee}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedLeaveType={selectedLeaveType}
          onLeaveTypeChange={setSelectedLeaveType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
      </div>

      {/* Summary Cards */}
      <LeaveSummaryCards />

      {/* Leave Requests Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeaveRequestsTable onLeaveRequestClick={handleLeaveRequestClick} />
      </div>

      {/* Leave Calendar View */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeaveCalendarView />
      </div>

      {/* Leave Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <LeaveStatistics />
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <LeaveStatistics />
        </div>
      </div>

      {/* Employee Leave Balance */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <EmployeeLeaveBalance />
      </div>

      {/* Employees Currently On Leave */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <EmployeesCurrentlyOnLeave onEmployeeClick={handleLeaveRequestClick} />
      </div>

      {/* Leave Policy Management */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeavePolicyManagement />
      </div>

      {/* Holiday Management */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <HolidayManagement />
      </div>

      {/* Reports Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <LeaveReports />
      </div>

      {/* Leave Approval Panel */}
      <LeaveApprovalPanel
        leaveRequest={selectedLeaveRequest}
        isOpen={isApprovalPanelOpen}
        onClose={() => { setIsApprovalPanelOpen(false); setSelectedLeaveRequest(null); }}
      />
    </div>
  );
}
