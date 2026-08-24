'use client';

import { Search, Filter, X } from 'lucide-react';

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  documentType: string;
  onDocumentTypeChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  expiryStatus: string;
  onExpiryStatusChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function DocumentFilters({
  searchTerm,
  onSearchChange,
  documentType,
  onDocumentTypeChange,
  department,
  onDepartmentChange,
  expiryStatus,
  onExpiryStatusChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
}: DocumentFiltersProps) {
  const hasActiveFilters = documentType || department || expiryStatus || dateRange || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by employee name, ID, or document name..."
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

        {/* Document Type Filter */}
        <select
          value={documentType}
          onChange={(e) => onDocumentTypeChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Types</option>
          <option value="id-proof">ID Proof</option>
          <option value="address-proof">Address Proof</option>
          <option value="offer-letter">Offer Letter</option>
          <option value="resume">Resume</option>
          <option value="contract">Contract</option>
          <option value="certificates">Certificates</option>
          <option value="bank-docs">Bank Documents</option>
          <option value="others">Others</option>
        </select>

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

        {/* Expiry Status Filter */}
        <select
          value={expiryStatus}
          onChange={(e) => onExpiryStatusChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
        >
          <option value="">All Status</option>
          <option value="valid">Valid</option>
          <option value="expiring-soon">Expiring Soon (30 days)</option>
          <option value="expired">Expired</option>
        </select>

        {/* Upload Date Range Filter */}
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
