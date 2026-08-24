'use client';

import { AlertCircle, Calendar, TrendingDown, MessageSquare, BookOpen } from 'lucide-react';

interface UnderperformingEmployeesProps {
  onEmployeeClick: (employee: any) => void;
}

const underperformers = [
  {
    id: 1,
    name: 'Employee A',
    score: 45,
    issue: 'Low Attendance',
    department: 'Operations',
  },
  {
    id: 2,
    name: 'Employee B',
    score: 52,
    issue: 'Low Productivity',
    department: 'Support',
  },
  {
    id: 3,
    name: 'Employee C',
    score: 58,
    issue: 'Missed Targets',
    department: 'Sales',
  },
  {
    id: 4,
    name: 'Employee D',
    score: 48,
    issue: 'Quality Issues',
    department: 'IT',
  },
];

export default function UnderperformingEmployees({ onEmployeeClick }: UnderperformingEmployeesProps) {
  const handleScheduleReview = (employee: any) => {
    alert(`Scheduling review for ${employee.name}...`);
  };

  const handleSendWarning = (employee: any) => {
    alert(`Sending warning to ${employee.name}...`);
  };

  const handleAssignTraining = (employee: any) => {
    alert(`Assigning training to ${employee.name}...`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Underperforming Employees</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Employee
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Department
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Score
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Issue
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {underperformers.map((employee) => (
              <tr key={employee.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEmployeeClick(employee)}
                    className="text-sm font-medium text-[#94cb3d] hover:text-[#7ab32e]"
                  >
                    {employee.name}
                  </button>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {employee.department}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                    {employee.score}%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  {employee.issue}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleScheduleReview(employee)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Schedule Review"
                    >
                      <Calendar className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSendWarning(employee)}
                      className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                      title="Send Warning"
                    >
                      <TrendingDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAssignTraining(employee)}
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="Assign Training"
                    >
                      <BookOpen className="h-4 w-4" />
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
