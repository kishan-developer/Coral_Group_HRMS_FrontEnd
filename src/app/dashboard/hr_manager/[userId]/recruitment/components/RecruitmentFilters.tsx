'use client';

import { Search, Filter, X } from 'lucide-react';

interface RecruitmentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  jobPosition: string;
  onJobPositionChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
  stage: string;
  onStageChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function RecruitmentFilters({
  searchTerm,
  onSearchChange,
  jobPosition,
  onJobPositionChange,
  department,
  onDepartmentChange,
  experience,
  onExperienceChange,
  stage,
  onStageChange,
  source,
  onSourceChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
}: RecruitmentFiltersProps) {
  const hasActiveFilters = jobPosition || department || experience || stage || source || dateRange || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by candidate name, job title, email, or phone..."
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

        {/* Job Position Filter */}
        <select
          value={jobPosition}
          onChange={(e) => onJobPositionChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Positions</option>
          <option value="software-engineer">Software Engineer</option>
          <option value="hr-manager">HR Manager</option>
          <option value="sales-executive">Sales Executive</option>
          <option value="accountant">Accountant</option>
          <option value="manager">Manager</option>
        </select>

        {/* Department Filter */}
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Departments</option>
          <option value="it">IT</option>
          <option value="hr">HR</option>
          <option value="sales">Sales</option>
          <option value="finance">Finance</option>
          <option value="operations">Operations</option>
        </select>

        {/* Experience Filter */}
        <select
          value={experience}
          onChange={(e) => onExperienceChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Experience</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5-10">5-10 Years</option>
          <option value="10+">10+ Years</option>
        </select>

        {/* Stage Filter */}
        <select
          value={stage}
          onChange={(e) => onStageChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Stages</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>

        {/* Source Filter */}
        <select
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="job-portal">Job Portal</option>
          <option value="referral">Referral</option>
          <option value="walk-in">Walk-in</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        {/* Date Range Filter */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
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
