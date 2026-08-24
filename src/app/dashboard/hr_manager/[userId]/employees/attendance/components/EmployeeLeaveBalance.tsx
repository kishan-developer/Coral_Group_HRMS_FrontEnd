'use client';

interface EmployeeLeaveBalanceProps {
  employeeBalances: Array<{
    id: string;
    name: string;
    employeeId: string;
    department: string;
    clTotal: number;
    clUsed: number;
    clRemaining: number;
    plTotal: number;
    plUsed: number;
    plRemaining: number;
    monthlyAccrual?: number;
  }>;
}

export default function EmployeeLeaveBalance({ employeeBalances }: EmployeeLeaveBalanceProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Employee Leave Balances</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {employeeBalances.map((balance) => (
          <div key={balance.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{balance.name}</p>
                <p className="text-xs text-zinc-500">{balance.employeeId} • {balance.department}</p>
              </div>
              {balance.monthlyAccrual && (
                <span className="text-xs text-zinc-500">Accrual: {balance.monthlyAccrual}/mo</span>
              )}
            </div>
            
            {/* CL Balance */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">CL Balance</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {balance.clUsed} / {balance.clTotal} used
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${(balance.clUsed / balance.clTotal) * 100}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">Remaining: {balance.clRemaining}</p>
            </div>

            {/* PL Balance */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">PL Balance</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {balance.plUsed} / {balance.plTotal} used
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all"
                  style={{ width: `${(balance.plUsed / balance.plTotal) * 100}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">Remaining: {balance.plRemaining}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
