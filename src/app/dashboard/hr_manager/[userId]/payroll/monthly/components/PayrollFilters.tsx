'use client';

import { Calendar, Building2, Search } from 'lucide-react';

interface PayrollFiltersProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function PayrollFilters({ selectedMonth, onMonthChange }: PayrollFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Month/Year */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Month/Year
          </div>
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        >
          <option value="2024-05">May 2024</option>
          <option value="2024-04">April 2024</option>
          <option value="2024-03">March 2024</option>
          <option value="2024-02">February 2024</option>
          <option value="2024-01">January 2024</option>
        </select>
      </div>

      {/* Department */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Department
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Departments</option>
          <option value="sales">Sales</option>
          <option value="hr">HR</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Status</option>
          <option value="processed">Processed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </div>
        </label>
        <input
          type="text"
          placeholder="Employee Name or ID"
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
      </div>
    </div>
  );
}
