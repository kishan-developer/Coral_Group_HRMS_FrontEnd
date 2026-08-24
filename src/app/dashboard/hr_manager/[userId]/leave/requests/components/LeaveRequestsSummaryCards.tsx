'use client';

import { FileText, Clock, CheckCircle, XCircle, Ban, Calendar } from 'lucide-react';

export default function LeaveRequestsSummaryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Total Requests */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Requests</p>
            <p className="text-3xl font-bold mt-2">245</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold mt-2">32</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Approved */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Approved</p>
            <p className="text-3xl font-bold mt-2">180</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Rejected */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Rejected</p>
            <p className="text-3xl font-bold mt-2">20</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <XCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Cancelled */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Cancelled</p>
            <p className="text-3xl font-bold mt-2">13</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Ban className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Today's Requests */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm font-medium">Today's Requests</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
