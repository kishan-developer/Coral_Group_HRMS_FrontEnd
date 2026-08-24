'use client';

import { RefreshCw, History } from 'lucide-react';

const employeeBalances = [
  { id: 1, employee: 'Rahul Sharma', casual: 12, sick: 8, earned: 15, used: 10, remaining: 25 },
  { id: 2, employee: 'Amit Kumar', casual: 12, sick: 8, earned: 15, used: 6, remaining: 29 },
  { id: 3, employee: 'Priya Singh', casual: 12, sick: 8, earned: 15, used: 12, remaining: 23 },
  { id: 4, employee: 'John Doe', casual: 12, sick: 8, earned: 15, used: 8, remaining: 27 },
  { id: 5, employee: 'Sarah Williams', casual: 12, sick: 8, earned: 15, used: 15, remaining: 20 },
];

export default function EmployeeLeaveBalance() {
  const handleAdjustBalance = (employeeId: number) => {
    alert(`Adjusting balance for employee ${employeeId}`);
  };

  const handleResetBalance = (employeeId: number) => {
    alert(`Resetting balance for employee ${employeeId}`);
  };

  const handleViewHistory = (employeeId: number) => {
    alert(`Viewing history for employee ${employeeId}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Employee Leave Balance</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Casual</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sick</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Earned</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Used</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Remaining</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeBalances.map((balance) => (
              <tr key={balance.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium">{balance.employee}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.casual}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.sick}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.earned}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.used}</td>
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-[#94cb3d]">{balance.remaining}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdjustBalance(balance.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Adjust Balance"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleResetBalance(balance.id)}
                      className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                      title="Reset Balance"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleViewHistory(balance.id)}
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="View History"
                    >
                      <History className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
