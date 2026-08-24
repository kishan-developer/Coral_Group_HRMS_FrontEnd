'use client';

import { Users, Building2, Clock, FileText, DollarSign, Shield } from 'lucide-react';

export default function MasterReportCategories() {
  const categories = [
    {
      title: 'Employee Masters',
      icon: Users,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      reports: ['Employee Directory', 'Employee Status Report', 'Joining Report', 'Confirmation Report', 'Exit Report', 'Employee Profile Audit'],
    },
    {
      title: 'Organization Masters',
      icon: Building2,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      reports: ['Company Details', 'Branches', 'Departments', 'Designations', 'Reporting Managers', 'Organization Structure'],
    },
    {
      title: 'Attendance Masters',
      icon: Clock,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      reports: ['Shift Masters', 'Shift Assignment Report', 'Holiday Calendar', 'Weekend Policies', 'Attendance Rules'],
    },
    {
      title: 'Leave Masters',
      icon: FileText,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      reports: ['Leave Types', 'Leave Policies', 'Leave Allocation Rules', 'Leave Balance Templates'],
    },
    {
      title: 'Payroll Masters',
      icon: DollarSign,
      iconColor: 'text-teal-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      reports: ['Salary Structures', 'Salary Components', 'Allowance Masters', 'Deduction Masters', 'PF Configuration', 'ESI Configuration', 'Tax Slabs'],
    },
    {
      title: 'User & Role Masters',
      icon: Shield,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      reports: ['Roles Report', 'Permissions Report', 'User Access Report', 'Login Audit Report'],
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Report Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${category.bgColor} p-2 rounded-lg`}>
                <category.icon className={`h-5 w-5 ${category.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.reports.map((report, reportIndex) => (
                <li key={reportIndex} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2 hover:text-[#94cb3d] cursor-pointer transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  {report}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
