'use client';

import { useState } from 'react';
import { Plus, FileText, Download, Settings } from 'lucide-react';
import LeaveSummaryWidgets from './components/LeaveSummaryWidgets';
import LeaveFilters from './components/LeaveFilters';
import LeaveTable from './components/LeaveTable';
import EmployeeLeaveBalance from './components/EmployeeLeaveBalance';
import ManualLeaveEntryModal from './components/ManualLeaveEntryModal';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [balanceRange, setBalanceRange] = useState('');
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [selectedLeaveIds, setSelectedLeaveIds] = useState<string[]>([]);

  // Mock leave requests
  const mockLeaveRequests = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      date: '2024-05-25',
      leaveType: 'CL' as const,
      duration: 'Full Day' as const,
      reason: 'Personal work',
      approvedBy: 'Jane Smith',
      hasDocument: false,
      status: 'approved' as const,
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      date: '2024-05-28',
      leaveType: 'PL' as const,
      duration: 'Full Day' as const,
      reason: 'Family vacation',
      hasDocument: true,
      documentUrl: '#',
      status: 'pending' as const,
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      date: '2024-05-30',
      leaveType: 'CL' as const,
      duration: 'Half Day' as const,
      reason: 'Medical appointment',
      approvedBy: 'Sarah Williams',
      hasDocument: true,
      documentUrl: '#',
      status: 'approved' as const,
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      date: '2024-06-01',
      leaveType: 'PL' as const,
      duration: 'Full Day' as const,
      reason: 'Wedding',
      hasDocument: false,
      status: 'pending' as const,
    },
    {
      id: '5',
      employeeName: 'Tom Brown',
      employeeId: 'EMP005',
      department: 'Hotels',
      date: '2024-06-05',
      leaveType: 'CL' as const,
      duration: 'Full Day' as const,
      reason: 'Personal emergency',
      hasDocument: false,
      status: 'rejected' as const,
    },
  ];

  // Mock employee balances
  const mockEmployeeBalances = [
    {
      id: '1',
      name: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      clTotal: 12,
      clUsed: 5,
      clRemaining: 7,
      plTotal: 15,
      plUsed: 8,
      plRemaining: 7,
      monthlyAccrual: 1.25,
    },
    {
      id: '2',
      name: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      clTotal: 12,
      clUsed: 3,
      clRemaining: 9,
      plTotal: 15,
      plUsed: 5,
      plRemaining: 10,
      monthlyAccrual: 1.25,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      clTotal: 12,
      clUsed: 8,
      clRemaining: 4,
      plTotal: 15,
      plUsed: 10,
      plRemaining: 5,
      monthlyAccrual: 1.25,
    },
    {
      id: '4',
      name: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      clTotal: 12,
      clUsed: 2,
      clRemaining: 10,
      plTotal: 15,
      plUsed: 3,
      plRemaining: 12,
      monthlyAccrual: 1.25,
    },
  ];

  // Mock employees for dropdown
  const mockEmployees = [
    { id: '1', name: 'John Doe', employeeId: 'EMP001' },
    { id: '2', name: 'Jane Smith', employeeId: 'EMP002' },
    { id: '3', name: 'Mike Johnson', employeeId: 'EMP003' },
    { id: '4', name: 'Sarah Williams', employeeId: 'EMP004' },
    { id: '5', name: 'Tom Brown', employeeId: 'EMP005' },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartment('');
    setDesignation('');
    setStatus('');
    setLeaveType('');
    setDateRange('');
    setBalanceRange('');
  };

  const handleView = (id: string) => {
    alert(`View leave request ${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Edit leave request ${id}`);
  };

  const handleApprove = (id: string) => {
    alert(`Approve leave request ${id}`);
  };

  const handleReject = (id: string, reason: string) => {
    alert(`Reject leave request ${id}. Reason: ${reason}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this leave request?')) {
      alert(`Leave request ${id} deleted`);
    }
  };

  const handleBulkApprove = (ids: string[]) => {
    alert(`Bulk approve ${ids.length} leave requests`);
    setSelectedLeaveIds([]);
  };

  const handleBulkReject = (ids: string[], reason: string) => {
    alert(`Bulk reject ${ids.length} leave requests. Reason: ${reason}`);
    setSelectedLeaveIds([]);
  };

  const handleManualEntrySubmit = (data: any) => {
    console.log('Manual leave entry:', data);
    alert('Manual leave entry submitted successfully');
    setIsManualEntryOpen(false);
  };

  const handleExportReport = () => {
    alert('Exporting leave report...');
  };

  const handleUpdatePolicy = () => {
    alert('Opening leave policy settings...');
  };

  const hasPendingLeaves = mockLeaveRequests.some(lr => lr.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Employee Attendance – CL & PL</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage casual and privilege leave requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleUpdatePolicy}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Update Policy
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button
            onClick={() => setIsManualEntryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Manual Entry
          </button>
        </div>
      </div>

      {/* Leave Summary Widgets */}
      <LeaveSummaryWidgets />

      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <LeaveFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            department={department}
            onDepartmentChange={setDepartment}
            designation={designation}
            onDesignationChange={setDesignation}
            status={status}
            onStatusChange={setStatus}
            leaveType={leaveType}
            onLeaveTypeChange={setLeaveType}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            balanceRange={balanceRange}
            onBalanceRangeChange={setBalanceRange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Leave Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <LeaveTable
            leaveRequests={mockLeaveRequests}
            onView={handleView}
            onEdit={handleEdit}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </div>

        {/* Employee Leave Balances */}
        <EmployeeLeaveBalance employeeBalances={mockEmployeeBalances} />
      </div>

      {/* Manual Leave Entry Modal */}
      <ManualLeaveEntryModal
        isOpen={isManualEntryOpen}
        onClose={() => setIsManualEntryOpen(false)}
        onSubmit={handleManualEntrySubmit}
        employees={mockEmployees}
      />
    </div>
  );
}
