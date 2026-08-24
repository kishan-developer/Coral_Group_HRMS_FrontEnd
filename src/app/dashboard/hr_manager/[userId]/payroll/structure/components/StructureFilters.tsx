'use client';

import { Search, Filter, X } from 'lucide-react';

interface StructureFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  designation: string;
  onDesignationChange: (value: string) => void;
  salaryType: string;
  onSalaryTypeChange: (value: string) => void;
  activeStatus: string;
  onActiveStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function StructureFilters({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  designation,
  onDesignationChange,
  salaryType,
  onSalaryTypeChange,
  activeStatus,
  onActiveStatusChange,
  onClearFilters,
}: StructureFiltersProps) {
  const hasActiveFilters = department || designation || salaryType || activeStatus || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by employee name, ID, or structure name..."
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

        {/* Salary Type Filter */}
        <select
          value={salaryType}
          onChange={(e) => onSalaryTypeChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Types</option>
          <option value="monthly">Monthly</option>
          <option value="hourly">Hourly</option>
          <option value="contract">Contract</option>
        </select>

        {/* Active Status Filter */}
        <select
          value={activeStatus}
          onChange={(e) => onActiveStatusChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
