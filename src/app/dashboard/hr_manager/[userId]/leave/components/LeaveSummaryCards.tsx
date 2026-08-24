'use client';

import { Users, FileText, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react';

export default function LeaveSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

      {/* Leave Requests */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Leave Requests</p>
            <p className="text-3xl font-bold mt-2">45</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Pending Approvals</p>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Approved Leaves */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Approved Leaves</p>
            <p className="text-3xl font-bold mt-2">28</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Rejected Leaves */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Rejected Leaves</p>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <XCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Employees On Leave Today */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm font-medium">On Leave Today</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
