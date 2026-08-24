import { AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import Card from '@/components/ui/Card/Card';

const payrollItems = [
  { label: 'Payroll Completed', value: '92%', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Overtime Hours', value: '146 hrs', icon: Clock, color: 'text-amber-600' },
  { label: 'Pending Issues', value: '4', icon: AlertCircle, color: 'text-red-600' },
  { label: 'Total Payout', value: '₹18.4L', icon: DollarSign, color: 'text-blue-600' },
];

export default function PayrollSummary() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Payroll Snapshot – Jan 2026</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {payrollItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className={`h-5 w-5 ${item.color} shrink-0 mt-0.5`} />
            <div>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{item.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div className="h-full w-[92%] rounded-full bg-green-500" />
      </div>
      <p className="mt-2 text-xs text-zinc-500">Payroll processing is 92% complete. 4 salary issues pending.</p>
    </Card>
  );
}
