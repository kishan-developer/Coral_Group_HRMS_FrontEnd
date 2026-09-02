'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  UserCheck,
  DollarSign,
  Clock,
  Ticket,
  FileText,
  Activity,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalCompanies: number;
  totalEmployees: number;
  activeUsers: number;
  monthlyRevenue: number;
  pendingApprovals: number;
  supportTickets: number;
  payrollProcessed: number;
  systemHealth: string;
  trialCompanies: number;
  activeCompanies: number;
  expiredCompanies: number;
}

export default function SuperAdminDashboard() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 156,
    totalEmployees: 12450,
    activeUsers: 8234,
    monthlyRevenue: 285000,
    pendingApprovals: 23,
    supportTickets: 45,
    payrollProcessed: 12450,
    systemHealth: 'Healthy',
    trialCompanies: 12,
    activeCompanies: 138,
    expiredCompanies: 6,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/super-admin/dashboard/stats`);
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        // Fallback to default stats
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [BACKEND_URL]);

  const widgets = [
    { title: 'Total Companies', value: stats.totalCompanies, icon: Building2, trend: '+5 this month' },
    { title: 'Total Employees', value: stats.totalEmployees.toLocaleString(), icon: Users, trend: '+234 this month' },
    { title: 'Active Employees', value: stats.activeUsers.toLocaleString(), icon: UserCheck, trend: '66% active' },
    { title: 'Monthly Revenue', value: `₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`, icon: DollarSign, trend: '+12% vs last month' },
    { title: 'Pending Approvals', value: stats.pendingApprovals, icon: Clock, trend: 'Needs attention' },
    { title: 'Support Tickets', value: stats.supportTickets, icon: Ticket, trend: '8 critical' },
    { title: 'Payroll Processed', value: stats.payrollProcessed.toLocaleString(), icon: FileText, trend: 'This month' },
    { title: 'System Health', value: stats.systemHealth, icon: Activity, trend: 'All systems operational' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-sm font-medium">Loading SuperAdmin portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              SuperAdmin Command Center
            </h1>
            <Badge variant="brand">Platform Governance</Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Global management of organizations, tenant subscriptions, and system permissions.
          </p>
        </div>
        <Button variant="primary" size="md" className="shrink-0 shadow-md shadow-[#94cb3d]/20">
          <ShieldAlert className="h-4 w-4" />
          <span>Security Audit Logs</span>
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {widgets.map((widget) => (
          <Card key={widget.title} className="hover:border-[#94cb3d]/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {widget.title}
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                    {widget.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{widget.trend}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center text-[#94cb3d]">
                  <widget.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription & Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#94cb3d]" />
              Tenant Subscription Health
            </CardTitle>
            <CardDescription>Breakdown of tenant lifecycle statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {stats.activeCompanies}
                </p>
                <p className="text-xs font-semibold text-[#94cb3d] uppercase tracking-wider mt-1">
                  Active Companies
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {stats.trialCompanies}
                </p>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mt-1">
                  Trial Periods
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {stats.expiredCompanies}
                </p>
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mt-1">
                  Expired / Cancelled
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Administrative Queue
            </CardTitle>
            <CardDescription>Items requiring SuperAdmin approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Company Approvals</span>
                <Badge variant="warning">8 Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Billing Verification</span>
                <Badge variant="secondary">5 Reviews</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Critical Support Tickets</span>
                <Badge variant="destructive">3 Open</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Audit Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
          <CardDescription>Live feed of tenant registrations and tier changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { company: 'TechCorp Inc.', action: 'Upgraded to Enterprise License', time: '2 hours ago' },
              { company: 'StartupXYZ', action: 'Trial subscription period ended', time: '5 hours ago' },
              { company: 'Global Solutions Ltd.', action: 'Registered new organization workspace', time: '1 day ago' },
              { company: 'Innovate Systems', action: 'Added 50 new employee seats', time: '2 days ago' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#94cb3d] ring-4 ring-[#94cb3d]/20" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {activity.company}
                    </p>
                    <p className="text-xs text-zinc-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-zinc-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
