'use client';

import { Calendar, User, Building2, Tag, MapPin } from 'lucide-react';

interface LeaveFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  selectedEmployee: string;
  onEmployeeChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedLeaveType: string;
  onLeaveTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedBranch: string;
  onBranchChange: (value: string) => void;
}

export default function LeaveFilters({
  dateRange,
  onDateRangeChange,
  selectedEmployee,
  onEmployeeChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLeaveType,
  onLeaveTypeChange,
  selectedStatus,
  onStatusChange,
  selectedBranch,
  onBranchChange,
}: LeaveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Date Range Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </div>
        </label>
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Employee Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Employee
          </div>
        </label>
        <select
          value={selectedEmployee}
          onChange={(e) => onEmployeeChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Employees</option>
          <option value="1">Rahul Sharma</option>
          <option value="2">Amit Kumar</option>
          <option value="3">Priya Singh</option>
          <option value="4">John Doe</option>
        </select>
      </div>

      {/* Department Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Department
          </div>
        </label>
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Departments</option>
          <option value="sales">Sales</option>
          <option value="hr">HR</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="operations">Operations</option>
        </select>
      </div>

      {/* Leave Type Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Leave Type
          </div>
        </label>
        <select
          value={selectedLeaveType}
          onChange={(e) => onLeaveTypeChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Types</option>
          <option value="casual">Casual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="earned">Earned Leave</option>
          <option value="maternity">Maternity Leave</option>
          <option value="paternity">Paternity Leave</option>
          <option value="unpaid">Unpaid Leave</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Branch Filter */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Branch
          </div>
        </label>
        <select
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Branches</option>
          <option value="headquarters">Headquarters</option>
          <option value="north">North Branch</option>
          <option value="south">South Branch</option>
          <option value="east">East Branch</option>
        </select>
      </div>
    </div>
  );
}
