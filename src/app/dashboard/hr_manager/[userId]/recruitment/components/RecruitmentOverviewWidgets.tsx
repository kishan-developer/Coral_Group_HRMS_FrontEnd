'use client';

import { Briefcase, Users, UserCheck, Calendar, Send, UserPlus } from 'lucide-react';

export default function RecruitmentOverviewWidgets() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Open Job Positions */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Open Jobs</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">8</div>
        <div className="text-xs text-zinc-500 mt-1">Active positions</div>
      </div>

      {/* Total Applicants */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Applicants</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">156</div>
        <div className="text-xs text-zinc-500 mt-1">Total candidates</div>
      </div>

      {/* Shortlisted Candidates */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Shortlisted</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">24</div>
        <div className="text-xs text-zinc-500 mt-1">Qualified</div>
      </div>

      {/* Interviews Scheduled */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Interviews</span>
        </div>
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
        <div className="text-xs text-zinc-500 mt-1">Scheduled</div>
      </div>

      {/* Offers Released */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
            <Send className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Offers</span>
        </div>
        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">5</div>
        <div className="text-xs text-zinc-500 mt-1">Released</div>
      </div>

      {/* Hires This Month */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <UserPlus className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Hires</span>
        </div>
        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">3</div>
        <div className="text-xs text-zinc-500 mt-1">This month</div>
      </div>
    </div>
  );
}
