'use client';

import { AlertCircle, CheckCircle, Clock, DollarSign, IndianRupee, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const payrollItems = [
  { label: 'Payroll Completed', value: '92% Processed', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' },
  { label: 'Total Overtime Hours', value: '146 hrs OT', icon: Clock, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50' },
  { label: 'Pending Disbursal Queries', value: '4 Tickets', icon: AlertCircle, color: 'bg-red-50 text-red-600 dark:bg-red-950/50' },
  { label: 'Total Monthly Payout', value: '₹18,40,000', icon: IndianRupee, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50' },
];

export default function PayrollSummary() {
  return (
    <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-[#94cb3d]" />
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                Indian Statutory Payroll Snapshot (INR ₹)
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Monthly payroll execution including Basic Pay, HRA, Provident Fund (PF), ESI, and Professional Tax.
            </p>
          </div>
          <Badge variant="brand" className="text-[10px] self-start sm:self-auto">
            Cycle: August 2026
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {payrollItems.map((item) => (
            <div key={item.label} className="bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 flex items-start gap-3">
              <div className={`p-2.5 rounded-xl ${item.color} shrink-0`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-700 dark:text-zinc-300">August 2026 Disbursal Progress</span>
            <span className="text-[#94cb3d]">92% Disbursed</span>
          </div>
          <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden p-0.5 border border-zinc-200/50 dark:border-zinc-700">
            <div className="h-full rounded-full bg-[#94cb3d] transition-all duration-500" style={{ width: '92%' }} />
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
            <span>Base Salary: ₹14,50,000</span>
            <span>Allowances & HRA: ₹3,90,000</span>
            <span>PF/ESI Deductions: ₹1,85,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
