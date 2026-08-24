'use client';

import { useState } from 'react';
import {
  Plus,
  Calendar,
  FileSpreadsheet,
  FileText,
  FileDown,
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import ReportsFilters from '@/app/dashboard/hr_manager/[userId]/reports/components/ReportsFilters';
import ReportsSummaryCards from '@/app/dashboard/hr_manager/[userId]/reports/components/ReportsSummaryCards';
import ReportsTable from '@/app/dashboard/hr_manager/[userId]/reports/components/ReportsTable';
import WorkforceAnalytics from '@/app/dashboard/hr_manager/[userId]/reports/components/WorkforceAnalytics';
import AttendanceAnalytics from '@/app/dashboard/hr_manager/[userId]/reports/components/AttendanceAnalytics';
import PayrollAnalytics from '@/app/dashboard/hr_manager/[userId]/reports/components/PayrollAnalytics';
import LeaveAnalytics from '@/app/dashboard/hr_manager/[userId]/reports/components/LeaveAnalytics';
import CustomReportBuilder from '@/app/dashboard/hr_manager/[userId]/reports/components/CustomReportBuilder';
import ScheduledReports from '@/app/dashboard/hr_manager/[userId]/reports/components/ScheduledReports';
import AuditLogs from '@/app/dashboard/hr_manager/[userId]/reports/components/AuditLogs';
import QuickReports from '@/app/dashboard/hr_manager/[userId]/reports/components/QuickReports';

export type ReportCategoryTab = 'overview' | 'workforce' | 'attendance' | 'payroll' | 'leave' | 'scheduled' | 'audit';

export default function SuperAdminReportsCenter() {
  const [activeTab, setActiveTab] = useState<ReportCategoryTab>('overview');
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerateReport = () => {
    setShowCustomBuilder(true);
  };

  const handleExportExcel = () => {
    showToast('Exporting report data to Excel (.xlsx)...', 'success');
  };

  const handleExportPDF = () => {
    showToast('Generating high-resolution PDF report...', 'success');
  };

  const handleExportCSV = () => {
    showToast('Exporting report raw dataset to CSV...', 'info');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-zinc-800'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Reports & Analytics
            </h1>
            <Badge variant="brand">SuperAdmin Master Engine</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            System-wide enterprise reporting across all companies, Payroll (INR), Attendance, Leave Balances, and Audit Trails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleGenerateReport}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
            size="sm"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Generate Custom Report
          </Button>
          <Button
            onClick={handleExportExcel}
            variant="outline"
            size="sm"
            className="rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 mr-1 text-emerald-600" />
            Excel
          </Button>
          <Button
            onClick={handleExportPDF}
            variant="outline"
            size="sm"
            className="rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800"
          >
            <FileText className="h-3.5 w-3.5 mr-1 text-red-600" />
            PDF
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800"
          >
            <FileDown className="h-3.5 w-3.5 mr-1 text-blue-600" />
            CSV
          </Button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & Master Reports', icon: BarChart3 },
          { id: 'workforce', label: 'Workforce Analytics', icon: Users },
          { id: 'attendance', label: 'Attendance & Punch Reports', icon: Clock },
          { id: 'payroll', label: 'Payroll & Taxes (INR)', icon: DollarSign },
          { id: 'leave', label: 'Leave & Balance Summary', icon: Calendar },
          { id: 'scheduled', label: 'Scheduled Automations', icon: Calendar },
          { id: 'audit', label: 'Security & Audit Logs', icon: ShieldCheck },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as ReportCategoryTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Master Reports */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm">
            <ReportsFilters />
          </div>
          <ReportsSummaryCards />
          <QuickReports />
          <Card className="rounded-lg">
            <CardContent className="p-6">
              <ReportsTable />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Workforce Analytics */}
      {activeTab === 'workforce' && (
        <div className="space-y-6">
          <WorkforceAnalytics />
        </div>
      )}

      {/* Tab 3: Attendance Reports */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <AttendanceAnalytics />
        </div>
      )}

      {/* Tab 4: Payroll & Taxes (INR) */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          <PayrollAnalytics />
        </div>
      )}

      {/* Tab 5: Leave & Balance Summary */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <LeaveAnalytics />
        </div>
      )}

      {/* Tab 6: Scheduled Automations */}
      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          <ScheduledReports />
        </div>
      )}

      {/* Tab 7: Security & Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <AuditLogs />
        </div>
      )}

      {/* Custom Report Builder Modal */}
      {showCustomBuilder && <CustomReportBuilder onClose={() => setShowCustomBuilder(false)} />}
    </div>
  );
}
