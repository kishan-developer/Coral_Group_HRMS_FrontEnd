'use client';

import { useState } from 'react';
import { Plus, Settings, ShieldCheck, Zap, RefreshCw, FileText } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    const emp = window.prompt('Enter Employee Name:', 'Rahul Sharma');
    if (!emp) return;
    const days = window.prompt('Enter Leave Days:', '2');
    alert(`Created leave request for ${emp} (${days} days)! Status set to Pending.`);
  };

  return (
    <div className="space-y-8 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CL & PL Rules Engine Active</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                2 Pending Approvals
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Leave & Absence Management Command Center
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Manage employee Casual Leave (CL) & Privilege Leave (PL) quotas, enforce the 6-month probation rule, trigger monthly auto-accrual, and process absence conversions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setIsPolicyModalOpen(true)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs px-4 py-2.5 border border-zinc-700 transition-all flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Policy Settings
            </Button>
            <Button
              onClick={handleCreateLeaveRequest}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Leave Request
            </Button>
          </div>
        </div>
      </div>

      {/* Export Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Leave Telemetry & Filter Controls
        </h2>
        <LeaveExportReports />
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm">
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
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <LeaveRequestsTable onLeaveRequestClick={handleLeaveRequestClick} />
      </div>

      {/* Employee Leave Balance & Probation Matrix */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <EmployeeLeaveBalance />
      </div>

      {/* Leave Calendar View */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <LeaveCalendarView />
      </div>

      {/* Employees Currently On Leave */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <EmployeesCurrentlyOnLeave onEmployeeClick={handleLeaveRequestClick} />
      </div>

      {/* Leave Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
          <LeaveStatistics />
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
          <HolidayManagement />
        </div>
      </div>

      {/* Leave Policy Management */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
        <LeavePolicyManagement />
      </div>

      {/* Leave Approval Panel Drawer */}
      <LeaveApprovalPanel
        leaveRequest={selectedLeaveRequest}
        isOpen={isApprovalPanelOpen}
        onClose={() => { setIsApprovalPanelOpen(false); setSelectedLeaveRequest(null); }}
      />
    </div>
  );
}
