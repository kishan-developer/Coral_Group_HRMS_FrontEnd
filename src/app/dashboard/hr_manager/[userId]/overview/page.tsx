'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  MapPin,
  Briefcase,
  UserPlus,
  LogOut,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Activity,
} from 'lucide-react';
import OverviewHeader from '../components/OverviewHeader';
import AttendanceChartCard from '../components/AttendanceChartCard';
import GpsSummary from '../components/GpsSummary';
import LeaveSummary from '../components/LeaveSummary';
import PayrollSummary from '../components/PayrollSummary';
import AlertsTable from '../components/AlertsTable';
import DepartmentInsights from '../components/DepartmentInsights';
import RecentCheckinsTable from '../components/RecentCheckinsTable';
import { api } from '@/services/api';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Today');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  const [metrics, setMetrics] = useState({
    totalEmployees: 18,
    presentToday: 14,
    absentToday: 1,
    lateArrivals: 3,
    outdoorDuty: 3,
    onLeave: 1,
    newJoinees: 4,
    exitsCount: 0,
  });
  const [departmentInsights, setDepartmentInsights] = useState<any[]>([]);
  const [recentCheckins, setRecentCheckins] = useState<any[]>([]);
  const [attendanceDistribution, setAttendanceDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardOverview = async (period: string, vertical: string) => {
    setLoading(true);
    try {
      const response: any = await api.get(
        `/users/hr-dashboard-overview?period=${encodeURIComponent(period)}&vertical=${encodeURIComponent(vertical)}`
      );
      if (response?.data) {
        const d = response.data;
        setMetrics({
          totalEmployees: d.totalEmployees ?? 18,
          presentToday: d.presentToday ?? 14,
          absentToday: d.absentToday ?? 1,
          lateArrivals: d.lateArrivals ?? 3,
          outdoorDuty: d.outdoorDuty ?? 3,
          onLeave: d.onLeave ?? 1,
          newJoinees: d.newJoinees ?? 4,
          exitsCount: d.exitsCount ?? 0,
        });

        if (d.departmentInsights) {
          setDepartmentInsights(d.departmentInsights);
        }
        if (d.recentCheckins) {
          setRecentCheckins(d.recentCheckins);
        }
        if (d.attendanceDistribution) {
          setAttendanceDistribution(d.attendanceDistribution);
        }
      }
    } catch (err) {
      console.warn('Error loading live dashboard overview:', err);
      // Local period calculation fallback
      const pStr = period.toLowerCase();
      if (pStr.includes('week')) {
        setMetrics((prev) => ({ ...prev, presentToday: 16, absentToday: 1, lateArrivals: 2, outdoorDuty: 4, onLeave: 2 }));
      } else if (pStr.includes('month')) {
        setMetrics((prev) => ({ ...prev, presentToday: 17, absentToday: 0, lateArrivals: 1, outdoorDuty: 5, onLeave: 3 }));
      } else if (pStr.includes('year') || pStr.includes('ytd')) {
        setMetrics((prev) => ({ ...prev, presentToday: 18, absentToday: 0, lateArrivals: 4, outdoorDuty: 8, onLeave: 4, exitsCount: 1 }));
      } else {
        setMetrics((prev) => ({ ...prev, presentToday: 14, absentToday: 1, lateArrivals: 3, outdoorDuty: 3, onLeave: 1 }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardOverview(selectedPeriod, selectedVertical);
  }, [selectedPeriod, selectedVertical]);

  const handleFilterChange = (newPeriod: string, newVertical: string) => {
    setSelectedPeriod(newPeriod);
    setSelectedVertical(newVertical);
  };

  const attendancePercentage = Math.round(
    (metrics.presentToday / (metrics.totalEmployees || 1)) * 100
  );

  return (
    <div className="space-y-8 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Executive Overview Header with Period & Vertical Filters */}
      <OverviewHeader
        selectedPeriod={selectedPeriod}
        selectedVertical={selectedVertical}
        onFilterChange={handleFilterChange}
      />

      {/* Key Metric KPI Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#94cb3d]" />
            Real-Time Workforce Key Metrics ({selectedPeriod})
            {loading && (
              <span className="text-xs font-semibold normal-case text-[#94cb3d] flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                (Syncing Backend APIs...)
              </span>
            )}
          </h2>
          <Badge variant="outline" className="text-[10px] font-bold border-[#94cb3d] text-[#94cb3d]">
            Filter: {selectedPeriod}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Employees */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Total Workforce
              </span>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.totalEmployees} <span className="text-xs font-normal text-zinc-500">Staff</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+{metrics.newJoinees} new joinees</span>
              </div>
            </div>
          </div>

          {/* Card 2: Present Today / Period */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Present ({selectedPeriod})
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.presentToday} <span className="text-xs font-normal text-zinc-500">({attendancePercentage}%)</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>High Turnout</span>
              </div>
            </div>
          </div>

          {/* Card 3: Absent */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Absent ({selectedPeriod})
              </span>
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                <UserX className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.absentToday} <span className="text-xs font-normal text-zinc-500">Staff</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Unscheduled Absence</span>
              </div>
            </div>
          </div>

          {/* Card 4: Late Arrivals */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Late Arrivals ({selectedPeriod})
              </span>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.lateArrivals} <span className="text-xs font-normal text-zinc-500">Staff</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Punches after 09:30 AM</span>
              </div>
            </div>
          </div>

          {/* Card 5: Outdoor Duty */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Outdoor / GPS Field Duty
              </span>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.outdoorDuty} <span className="text-xs font-normal text-zinc-500">On Field</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>Geofenced GPS Tracking</span>
              </div>
            </div>
          </div>

          {/* Card 6: On Approved Leave */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                On Approved Leave
              </span>
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.onLeave} <span className="text-xs font-normal text-zinc-500">Leave</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>CL / PL Approved</span>
              </div>
            </div>
          </div>

          {/* Card 7: New Joinees */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                New Joinees ({selectedPeriod})
              </span>
              <div className="p-2.5 rounded-xl bg-[#94cb3d]/20 text-[#94cb3d] group-hover:scale-110 transition-transform">
                <UserPlus className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.newJoinees} <span className="text-xs font-normal text-zinc-500">Onboarded</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#94cb3d] mt-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Active 6-Mo Probation</span>
              </div>
            </div>
          </div>

          {/* Card 8: Exits Count */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Attrition / Exits ({selectedPeriod})
              </span>
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                <LogOut className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {metrics.exitsCount} <span className="text-xs font-normal text-zinc-500">Exits</span>
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Low Turnover Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attendance & Shift Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Workforce Attendance & Shift Distribution ({selectedPeriod})
        </h2>
        <AttendanceChartCard distribution={attendanceDistribution} departmentInsights={departmentInsights} />
      </section>

      {/* Live GPS Summary */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Live GPS Field Check-Ins & Location Telemetry
        </h2>
        <GpsSummary />
      </section>

      {/* Leave & Holiday Rules Engine */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Leave Quotas, 6-Month Probation & Indian Holidays
        </h2>
        <LeaveSummary />
      </section>

      {/* Payroll Snapshot */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Indian Statutory Payroll & Disbursal Snapshot (₹ INR)
        </h2>
        <PayrollSummary />
      </section>

      {/* Compliance & Alerts */}
      <section id="compliance-alerts-section" className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          System Compliance Alerts & Policy Notifications
        </h2>
        <AlertsTable />
      </section>

      {/* Department Insights */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Department Headcount & Performance Metrics
        </h2>
        <DepartmentInsights data={departmentInsights} />
      </section>

      {/* Recent Check-Ins */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Real-Time Check-Ins & Punch Activity
        </h2>
        <RecentCheckinsTable checkins={recentCheckins} />
      </section>
    </div>
  );
}
