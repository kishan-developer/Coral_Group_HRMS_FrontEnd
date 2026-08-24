'use client';

import { Calendar, Building2, User, Filter } from 'lucide-react';

export default function MasterReportsFilters() {
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

      {/* Branch */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
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

      {/* Department */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Department</label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Departments</option>
          <option value="sales">Sales</option>
          <option value="hr">HR</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[140px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Created By */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Created By
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Users</option>
          <option value="admin">Admin</option>
          <option value="hr">HR Manager</option>
        </select>
      </div>
    </div>
  );
}
