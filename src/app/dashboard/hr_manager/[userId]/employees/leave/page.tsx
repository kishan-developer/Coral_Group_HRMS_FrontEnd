'use client';

import { useState } from 'react';
import { Plus, FileText, Settings, Download, Users } from 'lucide-react';
import LeaveSummaryWidgets from './components/LeaveSummaryWidgets';
import LeaveFilters from './components/LeaveFilters';
import LeaveRequestsTable from './components/LeaveRequestsTable';
import LeaveRequestDetailsModal from './components/LeaveRequestDetailsModal';
import AddLeaveEntryModal from './components/AddLeaveEntryModal';
import EmployeeLeaveBalancePanel from './components/EmployeeLeaveBalancePanel';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [duration, setDuration] = useState('');
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [isBalancePanelOpen, setIsBalancePanelOpen] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock leave requests
  const mockLeaveRequests = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      designation: 'Software Engineer',
      leaveType: 'CL' as const,
      startDate: '2024-05-25',
      endDate: '2024-05-25',
      duration: 1,
      reason: 'Personal work',
      hasDocument: false,
      status: 'approved' as const,
      approvedBy: 'Jane Smith',
      actionDate: '2024-05-20',
      leaveBalance: {
        cl: { allowed: 12, used: 5, remaining: 7 },
        pl: { allowed: 15, used: 8, remaining: 7 },
        sl: { allowed: 6, used: 2, remaining: 4 },
      },
      approvalHistory: [
        { action: 'approved', by: 'Jane Smith', date: '2024-05-20', comment: 'Approved as requested' },
      ],
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      designation: 'HR Manager',
      leaveType: 'PL' as const,
      startDate: '2024-05-28',
      endDate: '2024-05-30',
      duration: 3,
      reason: 'Family vacation',
      hasDocument: true,
      documentUrl: '#',
      status: 'pending' as const,
      leaveBalance: {
        cl: { allowed: 12, used: 3, remaining: 9 },
        pl: { allowed: 15, used: 5, remaining: 10 },
        sl: { allowed: 6, used: 1, remaining: 5 },
      },
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      designation: 'Sales Executive',
      leaveType: 'SL' as const,
      startDate: '2024-05-30',
      endDate: '2024-05-30',
      duration: 1,
      reason: 'Medical appointment',
      hasDocument: true,
      documentUrl: '#',
      status: 'approved' as const,
      approvedBy: 'Sarah Williams',
      actionDate: '2024-05-25',
      leaveBalance: {
        cl: { allowed: 12, used: 8, remaining: 4 },
        pl: { allowed: 15, used: 10, remaining: 5 },
        sl: { allowed: 6, used: 3, remaining: 3 },
      },
      approvalHistory: [
        { action: 'approved', by: 'Sarah Williams', date: '2024-05-25' },
      ],
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      designation: 'Accountant',
      leaveType: 'Maternity' as const,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      duration: 90,
      reason: 'Maternity leave',
      hasDocument: true,
      documentUrl: '#',
      status: 'approved' as const,
      approvedBy: 'Tom Brown',
      actionDate: '2024-05-15',
      leaveBalance: {
        cl: { allowed: 12, used: 2, remaining: 10 },
        pl: { allowed: 15, used: 3, remaining: 12 },
        sl: { allowed: 6, used: 1, remaining: 5 },
      },
      approvalHistory: [
        { action: 'approved', by: 'Tom Brown', date: '2024-05-15', comment: 'Maternity leave approved per policy' },
      ],
    },
    {
      id: '5',
      employeeName: 'Tom Brown',
      employeeId: 'EMP005',
      department: 'Hotels',
      designation: 'Hotel Manager',
      leaveType: 'LWP' as const,
      startDate: '2024-06-05',
      endDate: '2024-06-05',
      duration: 1,
      reason: 'Personal emergency',
      hasDocument: false,
      status: 'rejected' as const,
      rejectedBy: 'Jane Smith',
      actionDate: '2024-05-20',
      leaveBalance: {
        cl: { allowed: 12, used: 6, remaining: 6 },
        pl: { allowed: 15, used: 7, remaining: 8 },
        sl: { allowed: 6, used: 2, remaining: 4 },
      },
      approvalHistory: [
        { action: 'rejected', by: 'Jane Smith', date: '2024-05-20', comment: 'Insufficient leave balance, please use paid leave' },
      ],
    },
  ];

  // Mock employee balances
  const mockEmployeeBalances = [
    {
      id: '1',
      name: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      cl: { allowed: 12, used: 5, remaining: 7, carryForward: 2 },
      pl: { allowed: 15, used: 8, remaining: 7, monthlyAccrual: 1.25 },
      sl: { allowed: 6, used: 2, remaining: 4 },
    },
    {
      id: '2',
      name: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      cl: { allowed: 12, used: 3, remaining: 9 },
      pl: { allowed: 15, used: 5, remaining: 10, monthlyAccrual: 1.25 },
      sl: { allowed: 6, used: 1, remaining: 5 },
    },
    {
      id: '3',
      name: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      cl: { allowed: 12, used: 8, remaining: 4 },
      pl: { allowed: 15, used: 10, remaining: 5, monthlyAccrual: 1.25 },
      sl: { allowed: 6, used: 3, remaining: 3 },
    },
    {
      id: '4',
      name: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      cl: { allowed: 12, used: 2, remaining: 10 },
      pl: { allowed: 15, used: 3, remaining: 12, monthlyAccrual: 1.25 },
      sl: { allowed: 6, used: 1, remaining: 5 },
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
    setLeaveType('');
    setDepartment('');
    setDesignation('');
    setStatus('');
    setDateRange('');
    setDuration('');
  };

  const handleView = (id: string) => {
    const request = mockLeaveRequests.find(r => r.id === id);
    if (request) {
      setSelectedLeaveRequest(request);
      setIsDetailsModalOpen(true);
    }
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

  const handleAddEntrySubmit = (data: any) => {
    console.log('Add leave entry:', data);
    alert('Leave entry submitted successfully');
    setIsAddEntryOpen(false);
  };

  const handleExportReport = () => {
    alert('Exporting leave report...');
  };

  const handleUpdatePolicy = () => {
    alert('Opening leave policy settings...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Employee Leave Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage all leave requests and balances</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBalancePanelOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Users className="h-4 w-4" />
            View Balances
          </button>
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
            Export
          </button>
          <button
            onClick={() => setIsAddEntryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Leave Entry
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
            leaveType={leaveType}
            onLeaveTypeChange={setLeaveType}
            department={department}
            onDepartmentChange={setDepartment}
            designation={designation}
            onDesignationChange={setDesignation}
            status={status}
            onStatusChange={setStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            duration={duration}
            onDurationChange={setDuration}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <LeaveRequestsTable
            leaveRequests={mockLeaveRequests}
            onView={handleView}
            onEdit={handleEdit}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Add Leave Entry Modal */}
      <AddLeaveEntryModal
        isOpen={isAddEntryOpen}
        onClose={() => setIsAddEntryOpen(false)}
        onSubmit={handleAddEntrySubmit}
        employees={mockEmployees}
      />

      {/* Leave Request Details Modal */}
      <LeaveRequestDetailsModal
        leaveRequest={selectedLeaveRequest}
        isOpen={isDetailsModalOpen}
        onClose={() => { setIsDetailsModalOpen(false); setSelectedLeaveRequest(null); }}
        onApprove={handleApprove}
        onReject={handleReject}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Employee Leave Balance Panel */}
      <EmployeeLeaveBalancePanel
        isOpen={isBalancePanelOpen}
        onClose={() => setIsBalancePanelOpen(false)}
        employeeBalances={mockEmployeeBalances}
      />
    </div>
  );
}
