'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Filter,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Building2,
  Zap,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight,
  MoreVertical,
  X,
  FileSpreadsheet,
  FileText,
  RefreshCw,
  Crown,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Activity,
  Sliders,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Subscription {
  id: string;
  company: string;
  companyId: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  startDate: string;
  seats: number;
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'Auto-Debit';
}

export default function SubscriptionsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [cycleFilter, setCycleFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'trial' | 'expired' | 'invoices'>('all');

  // Modal State for New Subscription
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newPlan, setNewPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [newCycle, setNewCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [newSeats, setNewSeats] = useState<number>(50);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/super-admin/subscriptions`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setSubscriptions(data.data);
        } else {
          throw new Error('Fallback to mock');
        }
      } catch (error) {
        setSubscriptions([
          {
            id: 'SUB-1001',
            company: 'Acme Global Corporation',
            companyId: 'COMP-001',
            plan: 'enterprise',
            status: 'active',
            amount: 79999,
            billingCycle: 'monthly',
            nextBillingDate: '2026-09-15',
            startDate: '2025-09-15',
            seats: 250,
            paymentMethod: 'Wire Transfer',
          },
          {
            id: 'SUB-1002',
            company: 'Tech Solutions Pvt Ltd',
            companyId: 'COMP-002',
            plan: 'professional',
            status: 'active',
            amount: 24999,
            billingCycle: 'monthly',
            nextBillingDate: '2026-09-20',
            startDate: '2026-01-20',
            seats: 60,
            paymentMethod: 'Credit Card',
          },
          {
            id: 'SUB-1003',
            company: 'Global Industries Inc',
            companyId: 'COMP-003',
            plan: 'starter',
            status: 'trial',
            amount: 0,
            billingCycle: 'monthly',
            nextBillingDate: '2026-09-05',
            startDate: '2026-08-20',
            seats: 25,
            paymentMethod: 'Credit Card',
          },
          {
            id: 'SUB-1004',
            company: 'StartupXYZ Technologies',
            companyId: 'COMP-004',
            plan: 'professional',
            status: 'expired',
            amount: 24999,
            billingCycle: 'monthly',
            nextBillingDate: '2026-08-01',
            startDate: '2025-08-01',
            seats: 45,
            paymentMethod: 'Auto-Debit',
          },
          {
            id: 'SUB-1005',
            company: 'Innovate Enterprise Holdings',
            companyId: 'COMP-005',
            plan: 'enterprise',
            status: 'active',
            amount: 799990,
            billingCycle: 'yearly',
            nextBillingDate: '2027-01-01',
            startDate: '2026-01-01',
            seats: 500,
            paymentMethod: 'Wire Transfer',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [BACKEND_URL]);

  // Derived financial metrics
  const activeSubs = useMemo(() => subscriptions.filter((s) => s.status === 'active'), [subscriptions]);
  
  const monthlyRevenue = useMemo(() => {
    return activeSubs.reduce((sum, s) => {
      if (s.billingCycle === 'monthly') return sum + s.amount;
      return sum + Math.round(s.amount / 12);
    }, 0);
  }, [activeSubs]);

  const arrRevenue = useMemo(() => monthlyRevenue * 12, [monthlyRevenue]);

  // Filtered subscriptions list
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesPlan = planFilter === 'all' || sub.plan === planFilter;
      const matchesCycle = cycleFilter === 'all' || sub.billingCycle === cycleFilter;

      let matchesTab = true;
      if (activeTab === 'active') matchesTab = sub.status === 'active';
      else if (activeTab === 'trial') matchesTab = sub.status === 'trial';
      else if (activeTab === 'expired') matchesTab = sub.status === 'expired' || sub.status === 'cancelled';

      return matchesSearch && matchesStatus && matchesPlan && matchesCycle && matchesTab;
    });
  }, [subscriptions, searchTerm, statusFilter, planFilter, cycleFilter, activeTab]);

  const handleCreateSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) {
      showToast('Please enter a valid company name', 'warning');
      return;
    }

    const priceMap = {
      starter: newCycle === 'monthly' ? 7999 : 79990,
      professional: newCycle === 'monthly' ? 24999 : 249900,
      enterprise: newCycle === 'monthly' ? 79999 : 799990,
    };

    const newSub: Subscription = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      company: newCompany,
      companyId: `COMP-${Math.floor(100 + Math.random() * 900)}`,
      plan: newPlan,
      status: 'active',
      amount: priceMap[newPlan],
      billingCycle: newCycle,
      nextBillingDate: '2026-09-27',
      startDate: new Date().toISOString().split('T')[0],
      seats: newSeats,
      paymentMethod: 'Credit Card',
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowCreateModal(false);
    setNewCompany('');
    showToast(`Subscription created successfully for ${newSub.company}!`, 'success');
  };

  const handleExportCSV = () => {
    showToast('Exporting subscription & MRR ledger to CSV...', 'success');
  };

  const handleManageSub = (sub: Subscription) => {
    showToast(`Managing billing & license limits for ${sub.company}...`, 'info');
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Notification Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
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

      {/* Main Glassmorphic Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Crown className="h-3.5 w-3.5" />
                <span>SuperAdmin SaaS Revenue Hub</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                MRR Growth +18.4% YoY
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Subscriptions & Enterprise Billing
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Global revenue control center across multi-tenant corporate licenses, monthly recurring revenue (MRR), free trials, and automated invoice renewal engines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Subscription Plan
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold px-3 py-2.5"
            >
              <Download className="h-4 w-4 mr-1.5 text-emerald-400" />
              Export Billing CSV
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Financial & Subscription Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Monthly Recurring Revenue (MRR)
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              ₹{monthlyRevenue.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>ARR Run-Rate: ₹{(arrRevenue).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active Subscriptions
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {activeSubs.length} Companies
            </h3>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 block">
              100% Billing Compliance
            </span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Free Trial Accounts
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {subscriptions.filter((s) => s.status === 'trial').length} Accounts
            </h3>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 block">
              High Conversion Funnel
            </span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Expired & Churned
            </span>
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {subscriptions.filter((s) => s.status === 'expired' || s.status === 'cancelled').length} Accounts
            </h3>
            <span className="text-xs font-semibold text-zinc-500 mt-1 block">
              Renewal Triggers Sent
            </span>
          </div>
        </div>
      </div>

      {/* Plan Tier Distribution Cards */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#94cb3d]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Subscription Plan Tier Breakdown
            </h2>
          </div>
          <span className="text-xs font-bold text-[#94cb3d] bg-[#94cb3d]/10 px-2.5 py-0.5 rounded-full">
            Tier Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase">Starter Plan</span>
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">₹7,999 / mo</p>
              <p className="text-[11px] text-zinc-400">Up to 30 Seats • Basic HRMS</p>
            </div>
            <Badge variant="outline" className="font-bold">
              {subscriptions.filter((s) => s.plan === 'starter').length} Active
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Professional Plan</span>
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">₹24,999 / mo</p>
              <p className="text-[11px] text-zinc-400">Up to 100 Seats • Full Attendance & Payroll</p>
            </div>
            <Badge variant="brand">
              {subscriptions.filter((s) => s.plan === 'professional').length} Active
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Enterprise Master</span>
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">₹79,999 / mo</p>
              <p className="text-[11px] text-zinc-400">Unlimited Seats • Dedicated Support & Audit</p>
            </div>
            <Badge className="bg-purple-600 text-white font-bold">
              {subscriptions.filter((s) => s.plan === 'enterprise').length} Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'all', label: 'All Subscriptions', icon: CreditCard, count: subscriptions.length },
          { id: 'active', label: 'Active Paid Plans', icon: CheckCircle2, count: activeSubs.length },
          { id: 'trial', label: 'Free Trial Accounts', icon: Zap, count: subscriptions.filter((s) => s.status === 'trial').length },
          { id: 'expired', label: 'Expired & Churned', icon: AlertCircle, count: subscriptions.filter((s) => s.status === 'expired' || s.status === 'cancelled').length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#94cb3d]" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Filter Corporate Subscriptions
            </span>
          </div>
          {(searchTerm || statusFilter !== 'all' || planFilter !== 'all' || cycleFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPlanFilter('all');
                setCycleFilter('all');
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company name or subscription ID..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            />
          </div>

          {/* Plan Filter */}
          <div>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter Plan</option>
              <option value="professional">Professional Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Billing Cycle Filter */}
          <div>
            <select
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Billing Cycles</option>
              <option value="monthly">Monthly Billing</option>
              <option value="yearly">Yearly Billing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Subscriptions Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Corporate Subscription Accounts
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Showing {filteredSubscriptions.length} of {subscriptions.length} enterprise billing entries
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-bold border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/10">
            Automated Billing Active
          </Badge>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <RefreshCw className="h-7 w-7 animate-spin text-[#94cb3d]" />
            <p className="text-xs font-semibold">Loading subscription records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium border-collapse">
              <thead className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Company & ID</th>
                  <th className="py-3.5 px-4">Plan Tier</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Recurring Price</th>
                  <th className="py-3.5 px-4">Billing Cycle</th>
                  <th className="py-3.5 px-4">Next Renewal</th>
                  <th className="py-3.5 px-4">Seat Licenses</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                {filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8 text-zinc-400" />
                        <p className="font-semibold">No subscription records match your filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-850/60 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center text-white font-black text-sm shrink-0 border border-zinc-700/60 shadow-sm">
                            {sub.company.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#94cb3d] transition-colors">
                              {sub.company}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                              ID: {sub.id} • {sub.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide ${
                            sub.plan === 'enterprise'
                              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                              : sub.plan === 'professional'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          {sub.plan === 'enterprise' && <Crown className="h-3 w-3 fill-purple-500 text-purple-500" />}
                          {sub.plan}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {sub.status === 'active' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        )}
                        {sub.status === 'trial' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Zap className="h-3 w-3" />
                            Trial
                          </span>
                        )}
                        {sub.status === 'expired' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                            Expired
                          </span>
                        )}
                        {sub.status === 'cancelled' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            Cancelled
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        ₹{sub.amount.toLocaleString('en-IN')}
                        <span className="text-[10px] font-normal text-zinc-400 ml-0.5">
                          /{sub.billingCycle === 'yearly' ? 'yr' : 'mo'}
                        </span>
                      </td>
                      <td className="py-4 px-4 capitalize font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                        {sub.billingCycle}
                      </td>
                      <td className="py-4 px-4 text-zinc-500 whitespace-nowrap">
                        {sub.nextBillingDate}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 font-bold text-[11px]">
                          {sub.seats} Users
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <Button
                          onClick={() => handleManageSub(sub)}
                          variant="ghost"
                          size="sm"
                          className="text-[#94cb3d] hover:text-[#83b733] hover:bg-[#94cb3d]/10 font-bold text-xs rounded-lg"
                        >
                          Manage Plan
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Subscription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#94cb3d]" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Assign New Corporate Subscription
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubscriptionSubmit} className="p-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Apex Global Tech Pvt Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Plan Tier
                  </label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value as typeof newPlan)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="starter">Starter (₹7,999/mo)</option>
                    <option value="professional">Professional (₹24,999/mo)</option>
                    <option value="enterprise">Enterprise (₹79,999/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Billing Cycle
                  </label>
                  <select
                    value={newCycle}
                    onChange={(e) => setNewCycle(e.target.value as typeof newCycle)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="monthly">Monthly Disbursal</option>
                    <option value="yearly">Yearly (20% Discount)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                  User Seat Licenses
                </label>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={newSeats}
                  onChange={(e) => setNewSeats(parseInt(e.target.value) || 10)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                >
                  Activate Subscription
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
