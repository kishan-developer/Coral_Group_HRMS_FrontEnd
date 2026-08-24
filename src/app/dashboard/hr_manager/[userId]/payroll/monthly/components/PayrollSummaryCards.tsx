'use client';

import { Users, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function PayrollSummaryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* Total Employees */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Employees</p>
            <p className="text-3xl font-bold mt-2">180</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Total Payroll */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Total Payroll</p>
            <p className="text-3xl font-bold mt-2">₹45.2L</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Processed */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Processed</p>
            <p className="text-3xl font-bold mt-2">165</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
