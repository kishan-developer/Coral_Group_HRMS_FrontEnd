'use client';

import { Calendar, User, Building2, MapPin, Tag, Shield, Search, UserCheck } from 'lucide-react';

export default function LeaveRequestsFilters() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Date Range */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Employee */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Employee
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Employees</option>
          <option value="1">Rahul Sharma</option>
          <option value="2">Amit Kumar</option>
          <option value="3">Priya Singh</option>
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

      {/* Leave Type */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Leave Type
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Types</option>
          <option value="casual">Casual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="earned">Earned Leave</option>
          <option value="maternity">Maternity Leave</option>
          <option value="paternity">Paternity Leave</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Status
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Manager */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Manager
          </div>
        </label>
        <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent">
          <option value="">All Managers</option>
          <option value="1">John Manager</option>
          <option value="2">Sarah Lead</option>
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
