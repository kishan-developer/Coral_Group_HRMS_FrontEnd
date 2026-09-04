'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, User, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth';

export default function EmployeeDashboard() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/v1\/?$/, '');

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [attendanceCount, setAttendanceCount] = useState<number>(0);
  const [leaveBalance, setLeaveBalance] = useState<{ CL: number; PL: number }>({ CL: 12, PL: 15 });

  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Fetch user profile
      const userRes = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, { headers });
      const userData = await userRes.json();
      if (userData.success && userData.data) {
        setUserProfile(userData.data);
      }

      // Fetch attendance logs
      const attRes = await fetch(`${BACKEND_URL}/api/v1/attendance/user/${userId}`, { headers });
      const attData = await attRes.json();
      if (attData.success && Array.isArray(attData.data)) {
        setAttendanceCount(attData.data.length);
      }

      // Fetch leave balance
      const leaveRes = await fetch(`${BACKEND_URL}/api/v1/leaves/balance/${userId}`, { headers });
      const leaveData = await leaveRes.json();
      if (leaveData.success && leaveData.data) {
        const clUsed = leaveData.data['Casual Leave'] || 0;
        const plUsed = leaveData.data['Earned Leave'] || 0;
        setLeaveBalance({ CL: 12 - clUsed, PL: 15 - plUsed });
      }
    } catch (error) {
      console.error('Error fetching employee overview:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-xs font-medium">Loading live employee portal data...</p>
        </div>
      </div>
    );
  }

  const fullName =
    `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim() ||
    userProfile?.email?.split('@')[0] ||
    'Employee Portal';

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Welcome back, {fullName}!
            </h1>
            <Badge variant="brand">{userProfile?.role || 'active'}</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Track your daily attendance, manage leave requests, and inspect salary slips.
          </p>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/employee/${userId}/attendance`)}
          variant="primary"
          size="md"
          className="shrink-0 shadow-md bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Clock className="h-4 w-4 mr-1.5" />
          <span>Quick Check-In</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:border-[#94cb3d]/50 transition-all rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Attendance Logs
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">{attendanceCount} Days</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">Shift: 09:00 AM - 06:00 PM</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center text-[#94cb3d]">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-500/50 transition-all rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Leave Balance
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">{leaveBalance.CL + leaveBalance.PL} Days</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">CL: {leaveBalance.CL} | PL: {leaveBalance.PL}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-amber-500/50 transition-all rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Employee Code
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                    {userProfile?.employeeCode || userProfile?.employeeId || '-'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">{userProfile?.department || 'Verified Staff'}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-purple-500/50 transition-all rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Salary Statements
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">Active</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">PDF Payslips Archive</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-500">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-sm font-bold">Quick Employee Actions</CardTitle>
          <CardDescription className="text-xs">Direct access to portal operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push(`/dashboard/employee/${userId}/attendance`)}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-[#94cb3d]/10 hover:border-[#94cb3d]/40 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#94cb3d]/15 text-[#94cb3d] flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#94cb3d]">
                    Attendance Logs
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500">Punch in & history</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#94cb3d] transition-colors" />
            </button>

            <button
              onClick={() => router.push(`/dashboard/employee/${userId}/leave`)}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500/15 text-blue-500 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500">
                    Apply Leave
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500">Request time off</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
            </button>

            <button
              onClick={() => router.push(`/dashboard/employee/${userId}/payslips`)}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/15 text-purple-500 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-500">
                    My Payslips
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500">Download PDFs</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-purple-500 transition-colors" />
            </button>

            <button
              onClick={() => router.push(`/dashboard/employee/${userId}/profile`)}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500">
                    My Profile
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500">Personal details</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-amber-500 transition-colors" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
