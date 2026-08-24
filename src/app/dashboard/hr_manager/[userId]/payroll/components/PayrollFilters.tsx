'use client';

import { Search, Filter, X } from 'lucide-react';

interface PayrollFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  monthYear: string;
  onMonthYearChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  designation: string;
  onDesignationChange: (value: string) => void;
  salaryStatus: string;
  onSalaryStatusChange: (value: string) => void;
  paymentMode: string;
  onPaymentModeChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function PayrollFilters({
  searchTerm,
  onSearchChange,
  monthYear,
  onMonthYearChange,
  department,
  onDepartmentChange,
  designation,
  onDesignationChange,
  salaryStatus,
  onSalaryStatusChange,
  paymentMode,
  onPaymentModeChange,
  onClearFilters,
}: PayrollFiltersProps) {
  const hasActiveFilters = monthYear || department || designation || salaryStatus || paymentMode || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by employee name or ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Filters:</span>
        </div>

        {/* Month/Year Filter */}
        <input
          type="month"
          value={monthYear}
          onChange={(e) => onMonthYearChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        />

        {/* Department Filter */}
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Departments</option>
          <option value="real-estate">Real Estate</option>
          <option value="hotels">Hotels</option>
          <option value="saree">Saree</option>
          <option value="ho">HO</option>
          <option value="it">IT</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
        </select>

        {/* Designation Filter */}
        <select
          value={designation}
          onChange={(e) => onDesignationChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Designations</option>
          <option value="manager">Manager</option>
          <option value="senior-executive">Senior Executive</option>
          <option value="executive">Executive</option>
          <option value="junior-executive">Junior Executive</option>
        </select>

        {/* Salary Status Filter */}
        <select
          value={salaryStatus}
          onChange={(e) => onSalaryStatusChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="processed">Processed</option>
          <option value="paid">Paid</option>
          <option value="on-hold">On Hold</option>
        </select>

        {/* Payment Mode Filter */}
        <select
          value={paymentMode}
          onChange={(e) => onPaymentModeChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Modes</option>
          <option value="bank-transfer">Bank Transfer</option>
          <option value="cash">Cash</option>
          <option value="cheque">Cheque</option>
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
