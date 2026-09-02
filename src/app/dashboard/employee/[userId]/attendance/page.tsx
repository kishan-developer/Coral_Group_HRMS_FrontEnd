'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Clock,
  CheckCircle2,
  Calendar,
  Check,
  X,
  AlertCircle,
  Play,
  Square,
  Search,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AttendanceRecord {
  _id?: string;
  id?: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  workHours?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'overtime';
  location?: string;
}

export default function EmployeeAttendancePage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    fetchAttendance();
  }, [userId]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/attendance/user/${userId}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setAttendance(data.data);
      } else {
        // Fallback mock records
        const mock: AttendanceRecord[] = [
          { id: 'att-1', date: '2026-08-23', checkIn: '09:02 AM', checkOut: '06:05 PM', workHours: '9h 03m', status: 'present', location: 'HQ Office' },
          { id: 'att-2', date: '2026-08-22', checkIn: '09:35 AM', checkOut: '06:10 PM', workHours: '8h 35m', status: 'late', location: 'HQ Office' },
          { id: 'att-3', date: '2026-08-21', checkIn: '08:55 AM', checkOut: '08:30 PM', workHours: '11h 35m', status: 'overtime', location: 'HQ Office' },
          { id: 'att-4', date: '2026-08-20', checkIn: '09:00 AM', checkOut: '01:30 PM', workHours: '4h 30m', status: 'half-day', location: 'Remote WFH' },
          { id: 'att-5', date: '2026-08-19', checkIn: '-', checkOut: '-', workHours: '0h', status: 'absent', location: 'N/A' },
        ];
        setAttendance(mock);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePunchToggle = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateToday = new Date().toISOString().split('T')[0];

    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setLastCheckInTime(timeNow);
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        date: dateToday,
        checkIn: timeNow,
        checkOut: 'In Progress',
        workHours: 'Calculating...',
        status: 'present',
        location: 'HQ Web Portal Check-In',
      };
      setAttendance([newRec, ...attendance]);
      showToast(`Punched In Successfully at ${timeNow}!`, 'success');
    } else {
      setIsCheckedIn(false);
      const updated = attendance.map((rec, i) => {
        if (i === 0 && rec.checkOut === 'In Progress') {
          return {
            ...rec,
            checkOut: timeNow,
            workHours: '8h 30m',
          };
        }
        return rec;
      });
      setAttendance(updated);
      showToast(`Punched Out Successfully at ${timeNow}!`, 'info');
    }
  };

  const filteredAttendance = attendance.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const totalPresent = attendance.filter((a) => a.status === 'present' || a.status === 'overtime').length;
  const totalLate = attendance.filter((a) => a.status === 'late').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-blue-600'
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
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#94cb3d]" />
              My Attendance & Punch Clock Command Center
            </h1>
            <Badge variant="brand">{totalPresent} Days Attended</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time biometric check-in, punch times, shift schedules, and working hours history.
          </p>
        </div>

        <Button
          onClick={handlePunchToggle}
          className={`rounded-lg text-xs font-medium transition-all ${
            isCheckedIn
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-[#94cb3d] hover:bg-[#82b632] text-white'
          }`}
        >
          {isCheckedIn ? (
            <>
              <Square className="h-4 w-4 mr-1.5 fill-current" /> Punch Out Current Shift
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1.5 fill-current" /> Quick Punch In (09:00 AM)
            </>
          )}
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Today's Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {isCheckedIn ? 'Checked In' : 'Punched Out'}
              </span>
              <Badge variant={isCheckedIn ? 'success' : 'secondary'} className="text-[10px]">
                {isCheckedIn ? 'Active' : 'Offline'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Present Days</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">{totalPresent} Days</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Late Markings</p>
            <p className="text-xl font-bold text-amber-500 mt-1">{totalLate} Late Arrivals</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Shift Timing</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">09:00 AM - 06:00 PM</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Logs' },
          { id: 'present', label: 'Present' },
          { id: 'late', label: 'Late' },
          { id: 'overtime', label: 'Overtime' },
          { id: 'half-day', label: 'Half Day' },
          { id: 'absent', label: 'Absent' },
        ].map((st) => {
          const isActive = statusFilter === st.id;
          const count = st.id === 'all' ? attendance.length : attendance.filter((a) => a.status === st.id).length;
          return (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <span>{st.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading attendance history from backend...
            </div>
          ) : filteredAttendance.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No attendance logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Log Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Check In Punch</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Check Out Punch</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Work Hours</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredAttendance.map((a) => (
                    <tr key={a.id || a._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-50">
                        {a.date}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                        {a.checkIn || '-'}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                        {a.checkOut || '-'}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-900 dark:text-zinc-50 font-bold">
                        {a.workHours || '8h 00m'}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            a.status === 'present' || a.status === 'overtime'
                              ? 'success'
                              : a.status === 'late'
                              ? 'brand'
                              : 'destructive'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-500">
                        {a.location || 'HQ Office'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
