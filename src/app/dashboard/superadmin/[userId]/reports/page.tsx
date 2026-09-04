'use client';

import { useState, useMemo } from 'react';
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
  Search,
  Filter,
  Eye,
  Download,
  Zap,
  TrendingUp,
  Building2,
  MapPin,
  RefreshCw,
  X,
  Activity,
  SlidersHorizontal,
  ChevronRight,
  Send,
  AlertCircle,
  Activity,
  Layers,
  ArrowUpRight,
  PieChart as PieChartIcon,
  UserPlus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type ReportCategoryTab =
  | 'overview'
  | 'workforce'
  | 'attendance'
  | 'payroll'
  | 'leave'
  | 'scheduled'
  | 'audit';

interface ReportItem {
  id: string;
  name: string;
  category: string;
  generatedBy: string;
  date: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'Ready' | 'Generating' | 'Scheduled';
  size: string;
  department?: string;
}

export default function SuperAdminReportsCenter() {
  const [activeTab, setActiveTab] = useState<ReportCategoryTab>('overview');
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');

  // Custom Report Builder Form State
  const [newReportName, setNewReportName] = useState('');
  const [newReportCategory, setNewReportCategory] = useState('Payroll (INR)');
  const [newReportFormat, setNewReportFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [newReportDept, setNewReportDept] = useState('All Departments');
  const [isScheduled, setIsScheduled] = useState(false);

  // Master Reports Data
  const [reports, setReports] = useState<ReportItem[]>([
    { id: 'REP-101', name: 'Monthly Enterprise Payroll & Statutory Tax Register', category: 'Payroll (INR)', generatedBy: 'SuperAdmin System', date: '27 Aug 2026, 08:30 AM', format: 'PDF', status: 'Ready', size: '4.2 MB', department: 'Finance' },
    { id: 'REP-102', name: 'GPS Punch & Real-time Biometric Attendance Log', category: 'Attendance', generatedBy: 'HR Manager', date: '26 Aug 2026, 06:15 PM', format: 'Excel', status: 'Ready', size: '1.8 MB', department: 'All' },
    { id: 'REP-103', name: 'Privilege & Casual Leave Balance Summary', category: 'Leave', generatedBy: 'SuperAdmin System', date: '25 Aug 2026, 11:00 AM', format: 'PDF', status: 'Ready', size: '890 KB', department: 'HR' },
    { id: 'REP-104', name: 'Q3 Enterprise Performance Appraisal & KPI Matrix', category: 'Performance', generatedBy: 'HR Manager', date: '24 Aug 2026, 04:45 PM', format: 'Excel', status: 'Ready', size: '3.1 MB', department: 'Sales' },
    { id: 'REP-105', name: 'Employee TDS Deductions & Form 16 Preparation Ledger', category: 'Payroll (INR)', generatedBy: 'Accounts Officer', date: '22 Aug 2026, 02:20 PM', format: 'CSV', status: 'Ready', size: '640 KB', department: 'Finance' },
    { id: 'REP-106', name: 'Department Headcount & Diversity Analytics Audit', category: 'Workforce', generatedBy: 'SuperAdmin System', date: '20 Aug 2026, 09:10 AM', format: 'PDF', status: 'Ready', size: '2.5 MB', department: 'All' },
    { id: 'REP-107', name: 'System Security & Role-Based Access Audit Log', category: 'Audit', generatedBy: 'Security Bot', date: '19 Aug 2026, 12:00 PM', format: 'CSV', status: 'Ready', size: '5.4 MB', department: 'IT' },
  ]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleGenerateReport = () => {
    setShowCustomBuilder(true);
  };

  const handleCreateCustomReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportName.trim()) {
      showToast('Please enter a valid report title', 'warning');
      return;
    }

    const created: ReportItem = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      name: newReportName,
      category: newReportCategory,
      generatedBy: 'SuperAdmin User',
      date: 'Just Now',
      format: newReportFormat,
      status: 'Ready',
      size: '1.2 MB',
      department: newReportDept,
    };

    setReports([created, ...reports]);
    setShowCustomBuilder(false);
    setNewReportName('');
    showToast(`Report "${created.name}" generated successfully!`, 'success');
  };

  const handleExportExcel = () => {
    showToast('Exporting master enterprise dataset to Excel (.xlsx)...', 'success');
  };

  const handleExportPDF = () => {
    showToast('Generating high-resolution Executive PDF report...', 'success');
  };

  const handleExportCSV = () => {
    showToast('Exporting raw analytical dataset to CSV format...', 'info');
  };

  const handleQuickReport = (title: string) => {
    showToast(`Generating instant report: ${title}...`, 'success');
  };

  // Filtered Reports List
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        selectedDepartment === 'All' ||
        report.department === selectedDepartment ||
        report.department === 'All';

      const matchesFormat =
        selectedFormat === 'All' || report.format === selectedFormat;

      const matchesStatus =
        selectedStatus === 'All' || report.status === selectedStatus;

      return matchesSearch && matchesDept && matchesFormat && matchesStatus;
    });
  }, [reports, searchQuery, selectedDepartment, selectedFormat, selectedStatus]);

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Floating Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 transform translate-y-0 backdrop-blur-md border ${
            toast.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
              : toast.type === 'warning'
              ? 'bg-amber-600/95 border-amber-500 shadow-amber-900/20'
              : 'bg-zinc-900/95 border-zinc-700 shadow-zinc-900/40'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Main Header Card with Premium Glassmorphism Accent */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Activity className="h-3.5 w-3.5" />
                <span>SuperAdmin Master Engine</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Sync Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Reports & Enterprise Analytics
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Consolidated intelligence suite across Payroll (INR), Biometric Attendance Logs, Leave Balances, Department Headcount, and Security Audit Trails.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleGenerateReport}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Custom Report Builder
            </Button>
            <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/60">
              <Button
                onClick={handleExportExcel}
                variant="ghost"
                size="sm"
                className="text-zinc-200 hover:text-white hover:bg-zinc-700/60 rounded-lg text-xs font-semibold px-3"
              >
                <FileSpreadsheet className="h-4 w-4 mr-1.5 text-emerald-400" />
                Excel
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="ghost"
                size="sm"
                className="text-zinc-200 hover:text-white hover:bg-zinc-700/60 rounded-lg text-xs font-semibold px-3"
              >
                <FileText className="h-4 w-4 mr-1.5 text-red-400" />
                PDF
              </Button>
              <Button
                onClick={handleExportCSV}
                variant="ghost"
                size="sm"
                className="text-zinc-200 hover:text-white hover:bg-zinc-700/60 rounded-lg text-xs font-semibold px-3"
              >
                <FileDown className="h-4 w-4 mr-1.5 text-blue-400" />
                CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Grid (World-Class Stat Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Workforce
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">250</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12 hires this month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Attendance Rate
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">96.5%</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>+1.8% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Monthly Payroll
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">₹48.5L</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              <span>Statutory Taxes Cleared</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Leave Requests
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">145</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <span>12 Requests Pending</span>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              New Onboarded
            </span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <UserPlus className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">18</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
              <span>100% Verified</span>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Security Compliance
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">99.9%</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Audit Trail Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'overview', label: 'Overview & Master Reports', icon: BarChart3, count: reports.length },
          { id: 'workforce', label: 'Workforce Analytics', icon: Users, badge: 'Demographics' },
          { id: 'attendance', label: 'Attendance & GPS Logs', icon: Clock, badge: 'Realtime' },
          { id: 'payroll', label: 'Payroll & Taxes (INR)', icon: DollarSign, badge: 'Statutory' },
          { id: 'leave', label: 'Leave & Balance Summary', icon: Calendar },
          { id: 'scheduled', label: 'Scheduled Automations', icon: RefreshCw, count: 3 },
          { id: 'audit', label: 'Security & Audit Logs', icon: ShieldCheck, badge: 'Logs' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReportCategoryTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wide transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/5 rounded-t-xl'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-850 rounded-t-xl'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#94cb3d]' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-[#94cb3d] text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && !tab.count && (
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick One-Click Reports Toolbar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Zap className="h-4 w-4 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Quick One-Click Instant Generators
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Instantly trigger pre-formatted executive export files without setup
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#94cb3d] bg-[#94cb3d]/10 px-2.5 py-1 rounded-full border border-[#94cb3d]/20">
            Automated Excel & PDF Engine
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { title: "Today's Attendance Punch", icon: Clock, color: 'hover:border-blue-500 hover:text-blue-600' },
            { title: 'Monthly Payslip Summary', icon: DollarSign, color: 'hover:border-emerald-500 hover:text-emerald-600' },
            { title: 'Leave Balance Register', icon: Calendar, color: 'hover:border-amber-500 hover:text-amber-600' },
            { title: 'Employee Master Directory', icon: Users, color: 'hover:border-purple-500 hover:text-purple-600' },
            { title: 'Department Cost Breakdown', icon: Building2, color: 'hover:border-teal-500 hover:text-teal-600' },
            { title: 'Appraisal & KPI Ratings', icon: TrendingUp, color: 'hover:border-indigo-500 hover:text-indigo-600' },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleQuickReport(item.title)}
                className={`p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 text-left transition-all duration-150 group flex flex-col justify-between hover:bg-white dark:hover:bg-zinc-850 hover:shadow-md ${item.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <Download className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
                </div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview & Master Reports Table */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Advanced Filter Toolbar */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#94cb3d]" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Filter & Search Reports
                </span>
              </div>
              {(searchQuery || selectedDepartment !== 'All' || selectedFormat !== 'All' || selectedStatus !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                    setSelectedFormat('All');
                    setSelectedStatus('All');
                  }}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {/* Search Bar */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search report title, ID, or category..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                >
                  <option value="All">All Departments</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              {/* File Format Filter */}
              <div>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                >
                  <option value="All">All Formats</option>
                  <option value="PDF">PDF Document</option>
                  <option value="Excel">Excel Spreadsheet</option>
                  <option value="CSV">CSV Raw Data</option>
                </select>
              </div>

              {/* Date Range Selector */}
              <div>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                >
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Q3 2026">Q3 2026</option>
                  <option value="Year-to-Date">Year-to-Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Master Reports Data Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Generated Enterprise Master Reports
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Showing {filteredReports.length} of {reports.length} system audit files
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-bold border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/10">
                {filteredReports.length} Reports Ready
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Report ID & Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Generated By</th>
                    <th className="py-3.5 px-4">Generated Date</th>
                    <th className="py-3.5 px-4">Format & Size</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <AlertCircle className="h-8 w-8 text-zinc-400" />
                          <p className="font-semibold">No reports match your current filter parameters.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-zinc-50/80 dark:hover:bg-zinc-850/60 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#94cb3d] transition-colors">
                              {report.name}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                              ID: {report.id} • Dept: {report.department}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                            {report.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                          {report.generatedBy}
                        </td>
                        <td className="py-4 px-4 text-zinc-500 whitespace-nowrap">
                          {report.date}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                report.format === 'PDF'
                                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                                  : report.format === 'Excel'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              }`}
                            >
                              {report.format}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-mono">
                              ({report.size})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {report.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => showToast(`Previewing report: ${report.name}`, 'info')}
                              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all"
                              title="Quick Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => showToast(`Downloading ${report.name} (${report.format})`, 'success')}
                              className="p-2 rounded-lg bg-[#94cb3d] hover:bg-[#83b733] text-zinc-950 font-bold transition-all shadow-sm shadow-[#94cb3d]/20"
                              title="Download Report File"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Workforce Analytics */}
      {activeTab === 'workforce' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-blue-500" />
                Department Headcount Breakdown
              </h3>
              <Badge variant="outline">250 Employees</Badge>
            </div>
            <div className="space-y-3 pt-2">
              {[
                { name: 'Sales & Business Growth', pct: 35, count: '87 Employees', color: 'bg-blue-500' },
                { name: 'IT Engineering & Software', pct: 25, count: '62 Employees', color: 'bg-emerald-500' },
                { name: 'Human Resources & Talent', pct: 20, count: '50 Employees', color: 'bg-purple-500' },
                { name: 'Finance & Accounts', pct: 20, count: '51 Employees', color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-700 dark:text-zinc-300">{item.name}</span>
                    <span className="text-zinc-500">{item.count} ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Users className="h-4 w-4 text-teal-500" />
                Employment Type & Gender Ratios
              </h3>
              <Badge variant="outline">Enterprise Ratio</Badge>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2">Gender Demographics</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden flex">
                    <div className="bg-teal-500 h-full" style={{ width: '62%' }} />
                    <div className="bg-pink-500 h-full" style={{ width: '38%' }} />
                  </div>
                </div>
                <div className="flex justify-between text-xs font-bold mt-1.5 text-zinc-600 dark:text-zinc-400">
                  <span className="text-teal-600 dark:text-teal-400">Male: 62% (155)</span>
                  <span className="text-pink-600 dark:text-pink-400">Female: 38% (95)</span>
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <p className="text-xs font-semibold text-zinc-500 mb-2">Contract Distribution</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-500 text-[10px]">Full-Time Permanent</p>
                    <p className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">210 (84%)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-500 text-[10px]">Contract & Interns</p>
                    <p className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">40 (16%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Attendance Analytics */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-500" />
                Real-Time Attendance & Biometric GPS Punch Audit
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">Average Daily On-Time Arrival: 94.2%</p>
            </div>
            <Button
              size="sm"
              onClick={() => showToast('Syncing real-time punch logs from GPS mobile apps...', 'info')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Sync Biometric Server
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <p className="text-xs font-semibold uppercase tracking-wider">Present Today</p>
              <h4 className="text-3xl font-black mt-2">238 / 250</h4>
              <p className="text-xs mt-1">95.2% Attendance Score</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
              <p className="text-xs font-semibold uppercase tracking-wider">Late Arrivals (&gt;15 mins)</p>
              <h4 className="text-3xl font-black mt-2">7 Employees</h4>
              <p className="text-xs mt-1">Automatic Notifications Sent</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
              <p className="text-xs font-semibold uppercase tracking-wider">Approved On-Field / Remote</p>
              <h4 className="text-3xl font-black mt-2">12 Punch In</h4>
              <p className="text-xs mt-1">Geo-Fence Coordinates Verified</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Payroll & Taxes (INR) */}
      {activeTab === 'payroll' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-500" />
                Indian Payroll & Statutory Deductions Ledger (INR)
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">Total Monthly Disbursal: ₹48,50,000</p>
            </div>
            <Badge variant="outline" className="border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-500/10 font-bold">
              Form 16 & TDS Ready
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500">Gross Salary Expense</p>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">₹53,30,000</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500">PF + ESIC + Statutory Taxes</p>
              <p className="text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">₹4,80,000</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500">Net Salary Bank Disbursal</p>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹48,50,000</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Leave Summary */}
      {activeTab === 'leave' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500" />
            Enterprise Leave Balances & Approval Queue
          </h3>
          <p className="text-xs text-zinc-500">
            Privilege Leave (PL), Casual Leave (CL), Sick Leave (SL), and Maternity Leave allocations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-500">Total Leaves Taken</span>
              <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1">145 Days</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-500">Pending Approval</span>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">12 Requests</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-500">Average Balance / Emp</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">18.4 Days</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Scheduled Automations */}
      {activeTab === 'scheduled' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              Automated Email & PDF Report Delivery Schedules
            </h3>
            <Button size="sm" onClick={handleGenerateReport} className="bg-[#94cb3d] text-zinc-950 text-xs font-bold">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Schedule New Automation
            </Button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Daily Morning Punch Attendance Brief', schedule: 'Every Day at 09:00 AM', recipients: 'hr-managers@company.com', status: 'Active' },
              { name: 'Monthly Payroll Disbursal & Tax Audit PDF', schedule: '1st of Every Month at 10:00 AM', recipients: 'finance-admin@company.com', status: 'Active' },
              { name: 'Weekly System Audit Log Export', schedule: 'Every Monday at 08:00 AM', recipients: 'superadmin@company.com', status: 'Active' },
            ].map((sch, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{sch.name}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Frequency: {sch.schedule} • Recipients: {sch.recipients}</p>
                </div>
                <Badge variant="brand">{sch.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Security & Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            Security & Audit Activity Logs
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {[
              { time: '27 Aug 2026, 08:35 AM', user: 'SuperAdmin', action: 'Exported Monthly Payroll PDF Register', ip: '192.168.1.45', status: 'SUCCESS' },
              { time: '26 Aug 2026, 05:20 PM', user: 'HR Manager', action: 'Approved Leave Request for Emp ID #1042', ip: '192.168.1.88', status: 'SUCCESS' },
              { time: '25 Aug 2026, 11:15 AM', user: 'Accounts Officer', action: 'Generated TDS Statutory Summary', ip: '192.168.1.12', status: 'SUCCESS' },
            ].map((log, i) => (
              <div key={i} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-zinc-500">{log.time}</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{log.user}: {log.action}</span>
                <span className="text-zinc-400">IP: {log.ip}</span>
                <span className="text-emerald-500 font-bold">{log.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Report Builder Modal Overlay */}
      {showCustomBuilder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#94cb3d]" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Custom Report Builder Wizard
                </h3>
              </div>
              <button
                onClick={() => setShowCustomBuilder(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomReportSubmit} className="p-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                  Report Title
                </label>
                <input
                  type="text"
                  required
                  value={newReportName}
                  onChange={(e) => setNewReportName(e.target.value)}
                  placeholder="e.g. Q3 Sales & Attendance Performance Summary"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Category
                  </label>
                  <select
                    value={newReportCategory}
                    onChange={(e) => setNewReportCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="Payroll (INR)">Payroll (INR)</option>
                    <option value="Attendance">Attendance & GPS Logs</option>
                    <option value="Leave">Leave Balances</option>
                    <option value="Workforce">Workforce Demographics</option>
                    <option value="Performance">Performance Ratings</option>
                    <option value="Audit">Security & Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Export Format
                  </label>
                  <select
                    value={newReportFormat}
                    onChange={(e) => setNewReportFormat(e.target.value as 'PDF' | 'Excel' | 'CSV')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="PDF">PDF Executive Format</option>
                    <option value="Excel">Excel Spreadsheet (.xlsx)</option>
                    <option value="CSV">CSV Raw Data</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Target Department
                  </label>
                  <select
                    value={newReportDept}
                    onChange={(e) => setNewReportDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Date Range Scope
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none">
                    <option>Current Month</option>
                    <option>Last Quarter (Q2)</option>
                    <option>Full Year-To-Date</option>
                    <option>Custom Date Range</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Schedule Email Automation</p>
                  <p className="text-[10px] text-zinc-500">Automatically deliver this report every month</p>
                </div>
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#94cb3d]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCustomBuilder(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                >
                  Generate & Save Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
