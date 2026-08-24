'use client';

import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Clock, MapPin, Briefcase, UserPlus, LogOut } from 'lucide-react';
import StatsCard from '@/components/ui/Card/StatsCard';
import OverviewHeader from '../components/OverviewHeader';
import AttendanceChartCard from '../components/AttendanceChartCard';
import GpsSummary from '../components/GpsSummary';
import LeaveSummary from '../components/LeaveSummary';
import PayrollSummary from '../components/PayrollSummary';
import AlertsTable from '../components/AlertsTable';
import DepartmentInsights from '../components/DepartmentInsights';
import RecentCheckinsTable from '../components/RecentCheckinsTable';
import { api } from '@/services/api';

export default function AdminDashboard() {
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

  useEffect(() => {
    async function loadDashboardOverview() {
      try {
        const response: any = await api.get('/users/hr-dashboard-overview');
        if (response?.data) {
          const d = response.data;
          setMetrics((prev) => ({
            ...prev,
            totalEmployees: d.totalEmployees ?? prev.totalEmployees,
            presentToday: d.presentToday ?? prev.presentToday,
            absentToday: d.absentToday ?? prev.absentToday,
            lateArrivals: d.lateArrivals ?? prev.lateArrivals,
            outdoorDuty: d.outdoorDuty ?? prev.outdoorDuty,
            onLeave: d.onLeave ?? prev.onLeave,
            newJoinees: d.newJoinees ?? prev.newJoinees,
            exitsCount: d.exitsCount ?? prev.exitsCount,
          }));

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
      } finally {
        setLoading(false);
      }
    }

    loadDashboardOverview();
  }, []);

  return (
    <div className="space-y-8">
      <OverviewHeader />

      {/* Key Metrics */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Key Metrics {loading && <span className="text-xs font-normal lowercase text-[#94cb3d]">(fetching live DB data...)</span>}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Employees" value={String(metrics.totalEmployees)} icon={Users} trend={`${metrics.newJoinees} new`} trendUp />
          <StatsCard title="Present Today" value={String(metrics.presentToday)} icon={UserCheck} trend={`${Math.round((metrics.presentToday / (metrics.totalEmployees || 1)) * 100)}%`} trendUp />
          <StatsCard title="Absent Today" value={String(metrics.absentToday)} icon={UserX} trend="-2" trendUp={false} />
          <StatsCard title="Late Arrivals" value={String(metrics.lateArrivals)} icon={Clock} trend="+1" trendUp={false} />
          <StatsCard title="Outdoor Duty" value={String(metrics.outdoorDuty)} icon={MapPin} trend="On field" trendUp />
          <StatsCard title="On Leave" value={String(metrics.onLeave)} icon={Briefcase} />
          <StatsCard title="New Joinees (30d)" value={String(metrics.newJoinees)} icon={UserPlus} trend="Active" trendUp />
          <StatsCard title="Exits (30d)" value={String(metrics.exitsCount)} icon={LogOut} trend="Low" trendUp />
        </div>
      </section>

      {/* Attendance Overview */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Attendance Overview
        </h2>
        <AttendanceChartCard distribution={attendanceDistribution} departmentInsights={departmentInsights} />
      </section>

      {/* Live GPS Summary */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Live GPS Summary
        </h2>
        <GpsSummary />
      </section>

      {/* Leave & Holidays */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Leave & Holidays
        </h2>
        <LeaveSummary />
      </section>

      {/* Payroll Snapshot */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Payroll Snapshot
        </h2>
        <PayrollSummary />
      </section>

      {/* Compliance & Alerts */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Compliance & Alerts
        </h2>
        <AlertsTable />
      </section>

      {/* Department/Vertical Insights */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Department Insights
        </h2>
        <DepartmentInsights data={departmentInsights} />
      </section>

      {/* Recent Check-ins */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Recent Check-ins
        </h2>
        <RecentCheckinsTable checkins={recentCheckins} />
      </section>
    </div>
  );
}
