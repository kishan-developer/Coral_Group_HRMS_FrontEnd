'use client';

import { Calendar } from 'lucide-react';

interface EmployeesCurrentlyOnLeaveProps {
  onEmployeeClick: (employee: any) => void;
}

const employeesOnLeave = [
  { id: 1, name: 'Rahul Sharma', department: 'Sales', leaveType: 'Casual Leave', returnDate: '03 Jun' },
  { id: 2, name: 'Amit Kumar', department: 'HR', leaveType: 'Sick Leave', returnDate: '06 Jun' },
  { id: 3, name: 'Priya Singh', department: 'Marketing', leaveType: 'Earned Leave', returnDate: '10 Jun' },
  { id: 4, name: 'John Doe', department: 'IT', leaveType: 'Casual Leave', returnDate: '04 Jun' },
];

export default function EmployeesCurrentlyOnLeave({ onEmployeeClick }: EmployeesCurrentlyOnLeaveProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Employees Currently On Leave</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {employeesOnLeave.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onEmployeeClick(employee)}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 hover:shadow-lg hover:border-[#94cb3d] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{employee.name}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{employee.department}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Leave Type</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{employee.leaveType}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Return Date</span>
                <span className="font-medium text-[#94cb3d] flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {employee.returnDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
