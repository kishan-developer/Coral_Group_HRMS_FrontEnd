'use client';

import { ShieldCheck, CheckCircle, Lock, Users } from 'lucide-react';

export default function PayrollApprovalWorkflow() {
  const workflowSteps = [
    { id: 1, title: 'Payroll Prepared', role: 'Payroll Executive', status: 'completed', date: '25 May 2026' },
    { id: 2, title: 'Verified', role: 'HR Manager', status: 'completed', date: '26 May 2026' },
    { id: 3, title: 'Approved', role: 'Admin / Finance Head', status: 'completed', date: '27 May 2026' },
    { id: 4, title: 'Payslip Released', role: 'Employee Access Enabled', status: 'completed', date: '28 May 2026' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ShieldCheck className="h-5 w-5 text-amber-500" />;
      default:
        return <Lock className="h-5 w-5 text-zinc-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'pending':
        return 'border-amber-500';
      default:
        return 'border-zinc-300';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-purple-500" />
        Payroll Approval Workflow
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-700" />
        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="relative flex items-start gap-4">
              <div className={`relative z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 ${getStatusColor(step.status)} flex items-center justify-center`}>
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{step.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{step.role}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Self-Service Features */}
      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          Employee Self-Service Features
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Employees can:</p>
        <ul className="space-y-2">
          <li className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94cb3d]" />
            View Payslips
          </li>
          <li className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94cb3d]" />
            Download PDF
          </li>
          <li className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94cb3d]" />
            Email Copy
          </li>
          <li className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94cb3d]" />
            View Salary Breakdown
          </li>
          <li className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94cb3d]" />
            View Tax Deductions
          </li>
        </ul>
      </div>
    </div>
  );
}
