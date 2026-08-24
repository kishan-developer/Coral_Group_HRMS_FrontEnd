'use client';

import { Users, CheckCircle, DollarSign, FileText, UserPlus, Activity } from 'lucide-react';

export default function ReportsSummaryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Total Employees */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Employees</p>
            <p className="text-3xl font-bold mt-2">250</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Attendance Rate</p>
            <p className="text-3xl font-bold mt-2">96.5%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Payroll Expense */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Payroll Expense</p>
            <p className="text-2xl font-bold mt-2">₹48.5L</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Leave Requests</p>
            <p className="text-3xl font-bold mt-2">145</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* New Employees */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm font-medium">New Employees</p>
            <p className="text-3xl font-bold mt-2">18</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserPlus className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Active Employees */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium">Active Employees</p>
            <p className="text-3xl font-bold mt-2">232</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
