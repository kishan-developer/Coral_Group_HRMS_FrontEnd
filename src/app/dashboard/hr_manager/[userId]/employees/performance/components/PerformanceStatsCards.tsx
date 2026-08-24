'use client';

import { Users, UserCheck, TrendingUp, Award, Target, Clock, Activity } from 'lucide-react';

export default function PerformanceStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Employees */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Employees</p>
            <p className="text-3xl font-bold mt-2">156</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Active Employees */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Active Employees</p>
            <p className="text-3xl font-bold mt-2">142</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Average Performance Score */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Avg Performance Score</p>
            <p className="text-3xl font-bold mt-2">87%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Top Performer */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">Top Performer</p>
            <p className="text-lg font-bold mt-2">Rahul Sharma</p>
            <p className="text-amber-100 text-sm">95%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Target Achievement */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium">Target Achievement</p>
            <p className="text-3xl font-bold mt-2">92%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Target className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm font-medium">Attendance Rate</p>
            <p className="text-3xl font-bold mt-2">94%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Productivity Score */}
      <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm font-medium">Productivity Score</p>
            <p className="text-3xl font-bold mt-2">89%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* On Leave */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">On Leave</p>
            <p className="text-3xl font-bold mt-2">14</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
