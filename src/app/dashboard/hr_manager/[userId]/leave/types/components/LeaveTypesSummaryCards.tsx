'use client';

import { Folder, CheckCircle, XCircle, DollarSign } from 'lucide-react';

export default function LeaveTypesSummaryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* Total Leave Types */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Leave Types</p>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Folder className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Active Leave Types */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Active Leave Types</p>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Inactive Leave Types */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Inactive Leave Types</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <XCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Paid Leave Types */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Paid Leave Types</p>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
