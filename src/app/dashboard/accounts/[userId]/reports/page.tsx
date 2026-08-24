'use client';

import { useState } from 'react';
import {
  BarChart3,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  PieChart,
  DollarSign,
  ShieldCheck,
  Building2,
  CreditCard,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ReportItem {
  id: string;
  name: string;
  description: string;
  category: 'payroll' | 'salary' | 'tax' | 'compliance' | 'loan' | 'reimbursement';
}

export default function AccountsReportsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const reports: ReportItem[] = [
    { id: '1', name: 'Monthly Payroll Report', description: 'Complete monthly payroll breakdown with earnings and deductions', category: 'payroll' },
    { id: '2', name: 'Salary Register', description: 'Comprehensive salary register for all enrolled employees', category: 'salary' },
    { id: '3', name: 'Department Salary Report', description: 'Salary disbursal analysis grouped by department', category: 'salary' },
    { id: '4', name: 'Tax Deduction (TDS) Summary', description: 'TDS and income tax deduction statutory summary', category: 'tax' },
    { id: '5', name: 'Provident Fund (PF) Return', description: 'Provident Fund employee and employer contribution details', category: 'compliance' },
    { id: '6', name: 'ESI Statutory Report', description: 'Employee State Insurance monthly deposit statement', category: 'compliance' },
    { id: '7', name: 'Loan & Advance Recovery Report', description: 'Employee loan balances and EMI deduction status', category: 'loan' },
    { id: '8', name: 'Reimbursement Audit Summary', description: 'Employee travel, medical, and claims summary', category: 'reimbursement' },
    { id: '9', name: 'Yearly Payroll & Disbursal Summary', description: 'Annual payroll cost analysis and year-on-year trends', category: 'payroll' },
    { id: '10', name: 'Professional Tax (PT) Report', description: 'State-wise professional tax filing summary', category: 'compliance' },
  ];

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredReports =
    selectedCategory === 'All' ? reports : reports.filter((r) => r.category === selectedCategory);

  const handleGenerateReport = (reportName: string) => {
    showToast(`Generating ${reportName}...`);
  };

  const handleExport = (format: string) => {
    showToast(`Exporting accounts report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 bg-[#94cb3d]">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#94cb3d]" />
              Financial & Payroll Reports Hub
            </h1>
            <Badge variant="brand">{reports.length} Standard Reports</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Generate, audit, and export statutory PF/ESI returns, salary registers, TDS deductions, and P&L financial reports.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'payroll', 'salary', 'tax', 'compliance', 'loan', 'reimbursement'].map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Reports Grid using Lucide React Vector Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((r) => (
          <Card key={r.id} className="rounded-xl border-zinc-200/80 dark:border-zinc-800 hover:border-[#94cb3d]/40 transition-all">
            <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#94cb3d]/15 text-[#94cb3d] flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                    {r.category}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{r.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{r.description}</p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  onClick={() => handleGenerateReport(r.name)}
                  size="sm"
                  className="flex-1 bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-medium"
                >
                  Generate Report
                </Button>
                <Button
                  onClick={() => handleExport('excel')}
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium border-zinc-200 dark:border-zinc-700"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export Options Banner */}
      <Card className="rounded-xl">
        <CardContent className="p-6">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-3">
            Batch Export & Print Options
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => handleExport('pdf')} variant="outline" size="sm" className="text-xs font-medium">
              <Download className="h-4 w-4 mr-1.5 text-red-500" /> Export PDF
            </Button>
            <Button onClick={() => handleExport('excel')} variant="outline" size="sm" className="text-xs font-medium">
              <Download className="h-4 w-4 mr-1.5 text-emerald-500" /> Export Excel
            </Button>
            <Button onClick={() => handleExport('csv')} variant="outline" size="sm" className="text-xs font-medium">
              <Download className="h-4 w-4 mr-1.5 text-blue-500" /> Export CSV
            </Button>
            <Button onClick={() => showToast('Sending report to printer...')} variant="outline" size="sm" className="text-xs font-medium">
              <Printer className="h-4 w-4 mr-1.5 text-zinc-600" /> Print Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
