'use client';

import { useState } from 'react';
import { Save, Info } from 'lucide-react';

export default function LeavePolicyManagement() {
  const [policies, setPolicies] = useState({
    casualLeave: 12,
    sickLeave: 8,
    earnedLeave: 15,
    maternityLeave: 180,
    paternityLeave: 15,
    carryForward: true,
    leaveEncashment: true,
    sandwichLeaveRule: false,
  });

  const handleSave = () => {
    alert('Leave policies saved successfully!');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Leave Policy Management</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors mt-2 sm:mt-0"
        >
          <Save className="h-4 w-4" />
          Save Policies
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Casual Leave */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Casual Leave (Days)
          </label>
          <input
            type="number"
            value={policies.casualLeave}
            onChange={(e) => setPolicies({ ...policies, casualLeave: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>

        {/* Sick Leave */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Sick Leave (Days)
          </label>
          <input
            type="number"
            value={policies.sickLeave}
            onChange={(e) => setPolicies({ ...policies, sickLeave: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>

        {/* Earned Leave */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Earned Leave (Days)
          </label>
          <input
            type="number"
            value={policies.earnedLeave}
            onChange={(e) => setPolicies({ ...policies, earnedLeave: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>

        {/* Maternity Leave */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Maternity Leave (Days)
          </label>
          <input
            type="number"
            value={policies.maternityLeave}
            onChange={(e) => setPolicies({ ...policies, maternityLeave: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>

        {/* Paternity Leave */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Paternity Leave (Days)
          </label>
          <input
            type="number"
            value={policies.paternityLeave}
            onChange={(e) => setPolicies({ ...policies, paternityLeave: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>

        {/* Policy Toggles */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Policy Settings
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={policies.carryForward}
                onChange={(e) => setPolicies({ ...policies, carryForward: e.target.checked })}
                className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Carry Forward</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={policies.leaveEncashment}
                onChange={(e) => setPolicies({ ...policies, leaveEncashment: e.target.checked })}
                className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Leave Encashment</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={policies.sandwichLeaveRule}
                onChange={(e) => setPolicies({ ...policies, sandwichLeaveRule: e.target.checked })}
                className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Sandwich Leave Rule</span>
            </label>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-1">Leave Policy Information</p>
          <p className="text-blue-700 dark:text-blue-300">
            Configure the leave policies for your organization. These settings will apply to all employees. Changes will take effect immediately for new leave requests.
          </p>
        </div>
      </div>
    </div>
  );
}
