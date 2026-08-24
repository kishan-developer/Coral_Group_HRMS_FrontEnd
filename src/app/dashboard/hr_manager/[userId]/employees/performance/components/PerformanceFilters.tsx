'use client';

import { Calendar, User, Building2, MapPin, Briefcase } from 'lucide-react';

interface PerformanceFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  selectedEmployee: string;
  onEmployeeChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedBranch: string;
  onBranchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export default function PerformanceFilters({
  dateRange,
  onDateRangeChange,
  selectedEmployee,
  onEmployeeChange,
  selectedDepartment,
  onDepartmentChange,
  selectedBranch,
  onBranchChange,
  selectedRole,
  onRoleChange,
}: PerformanceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Date Range Filter */}
      <div className="flex-1 min-w-[200px]">
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
      <div className="flex-1 min-w-[200px]">
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
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
          <option value="3">Mike Johnson</option>
          <option value="4">Sarah Williams</option>
          <option value="5">Rahul Sharma</option>
          <option value="6">Amit Kumar</option>
        </select>
      </div>

      {/* Department Filter */}
      <div className="flex-1 min-w-[200px]">
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
          <option value="marketing">Marketing</option>
          <option value="hr">HR</option>
          <option value="support">Support</option>
          <option value="accounts">Accounts</option>
          <option value="operations">Operations</option>
        </select>
      </div>

      {/* Branch/Location Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Branch/Location
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
          <option value="west">West Branch</option>
        </select>
      </div>

      {/* Role Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Role
          </div>
        </label>
        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="">All Roles</option>
          <option value="executive">Executive</option>
          <option value="manager">Manager</option>
          <option value="senior">Senior</option>
          <option value="junior">Junior</option>
          <option value="intern">Intern</option>
        </select>
      </div>
    </div>
  );
}
