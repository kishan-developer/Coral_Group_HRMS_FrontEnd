'use client';

import { Users, Building2, UserCheck, Clock, FileText, DollarSign } from 'lucide-react';

export default function MasterSummaryCards() {
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

      {/* Departments */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Departments</p>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Designations */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Designations</p>
            <p className="text-3xl font-bold mt-2">35</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Shifts */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Shifts</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Leave Types */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm font-medium">Leave Types</p>
            <p className="text-3xl font-bold mt-2">10</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Salary Structures */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium">Salary Structures</p>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
