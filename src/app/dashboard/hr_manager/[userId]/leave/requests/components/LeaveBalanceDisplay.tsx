'use client';

export default function LeaveBalanceDisplay() {
  const leaveBalances = [
    { type: 'Casual', available: 12, used: 5, remaining: 7 },
    { type: 'Sick', available: 8, used: 2, remaining: 6 },
    { type: 'Earned', available: 15, used: 4, remaining: 11 },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Leave Balance</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Leave Type</th>
              <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Available</th>
              <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Used</th>
              <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {leaveBalances.map((balance, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{balance.type} Leave</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.available}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{balance.used}</td>
                <td className="py-3 px-4 text-sm font-semibold text-[#94cb3d]">{balance.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
