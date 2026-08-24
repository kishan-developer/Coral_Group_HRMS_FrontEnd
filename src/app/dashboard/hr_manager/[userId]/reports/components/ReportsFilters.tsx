'use client';

import { Calendar, Building2, MapPin, FileText, Search } from 'lucide-react';

export default function ReportsFilters() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Date Range */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </div>
        </label>
        <input
          type="text"
          placeholder="Select Date Range"
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
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

      {/* Branch */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Branch
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Branches</option>
          <option value="headquarters">Headquarters</option>
          <option value="north">North Branch</option>
          <option value="south">South Branch</option>
        </select>
      </div>

      {/* Employee */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Employee</label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Employees</option>
          <option value="1">Rahul Sharma</option>
          <option value="2">Amit Kumar</option>
          <option value="3">Priya Singh</option>
        </select>
      </div>

      {/* Report Type */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report Type
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Types</option>
          <option value="hr">HR Reports</option>
          <option value="attendance">Attendance Reports</option>
          <option value="payroll">Payroll Reports</option>
          <option value="leave">Leave Reports</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[140px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex-1 min-w-[250px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </div>
        </label>
        <input
          type="text"
          placeholder="Report Name, ID..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
      </div>
    </div>
  );
}
