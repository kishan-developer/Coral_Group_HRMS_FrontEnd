'use client';

export default function PayrollProcessingStatus() {
  const departments = [
    { name: 'Sales', employees: 45, generated: 45, pending: 0 },
    { name: 'HR', employees: 10, generated: 10, pending: 0 },
    { name: 'Accounts', employees: 15, generated: 12, pending: 3 },
    { name: 'IT', employees: 30, generated: 28, pending: 2 },
    { name: 'Marketing', employees: 20, generated: 20, pending: 0 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Payroll Processing Status</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Department</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employees</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Generated</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Pending</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Progress</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.name}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{dept.employees}</td>
                <td className="py-3 px-4 text-sm text-green-600 font-medium">{dept.generated}</td>
                <td className="py-3 px-4 text-sm text-amber-600 font-medium">{dept.pending}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-[#94cb3d] h-2 rounded-full"
                      style={{ width: `${(dept.generated / dept.employees) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{Math.round((dept.generated / dept.employees) * 100)}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
