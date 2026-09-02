'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, ShieldCheck, Sun, Info, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface CalendarEvent {
  day: number;
  type: 'approved' | 'pending' | 'rejected' | 'holiday' | 'weekend';
  label: string;
  employee?: string;
  leaveType?: string;
}

export default function LeaveCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7, 1)); // August 2026
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ day: number; events: CalendarEvent[] } | null>(null);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Mock calendar events mapping
  const mockEvents: Record<number, CalendarEvent[]> = {
    5: [{ day: 5, type: 'pending', label: 'Rahul Sharma', employee: 'Rahul Sharma (EMP-1002)', leaveType: 'Casual Leave (CL)' }],
    12: [{ day: 12, type: 'approved', label: 'Amit Kumar', employee: 'Amit Kumar (EMP-1009)', leaveType: 'Casual Leave (CL)' }],
    15: [{ day: 15, type: 'holiday', label: 'Independence Day', leaveType: 'Gazetted National Holiday' }],
    20: [{ day: 20, type: 'approved', label: 'Priya Singh', employee: 'Priya Singh (EMP-1005)', leaveType: 'Privilege Leave (PL)' }],
    25: [{ day: 25, type: 'pending', label: 'Sneha Gupta', employee: 'Sneha Gupta (EMP-1012)', leaveType: 'Casual Leave (CL)' }],
    28: [{ day: 28, type: 'approved', label: 'Vikram Malhotra', employee: 'Vikram Malhotra (EMP-1018)', leaveType: 'Casual Leave (CL)' }],
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[90px] border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/30" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 27 && currentMonth.getMonth() === 7 && currentMonth.getFullYear() === 2026;
      const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayOfWeek = dateObj.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dayEvents = mockEvents[day] || [];

      days.push(
        <div
          key={day}
          onClick={() => {
            if (dayEvents.length > 0) {
              setSelectedDayEvents({ day, events: dayEvents });
            }
          }}
          className={`min-h-[90px] p-2 border border-zinc-200/70 dark:border-zinc-800/80 transition-all flex flex-col justify-between cursor-pointer group ${
            isToday
              ? 'bg-[#94cb3d]/10 border-[#94cb3d] ring-2 ring-[#94cb3d]/30'
              : isWeekend
              ? 'bg-zinc-50 dark:bg-zinc-950/60 text-zinc-400'
              : 'bg-white dark:bg-zinc-900 hover:border-[#94cb3d]/50 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold ${
                isToday
                  ? 'h-6 w-6 rounded-full bg-[#94cb3d] text-zinc-950 flex items-center justify-center font-extrabold'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {day}
            </span>
            {isWeekend && <span className="text-[9px] font-bold text-zinc-400 uppercase">OFF</span>}
          </div>

          <div className="space-y-1 mt-1">
            {dayEvents.map((ev, idx) => (
              <div
                key={idx}
                className={`p-1 rounded-md text-[10px] font-extrabold truncate border ${
                  ev.type === 'approved'
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
                    : ev.type === 'pending'
                    ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
                    : ev.type === 'holiday'
                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                }`}
              >
                {ev.label}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Calendar Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#94cb3d]" />
            <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              Workforce Leave & Holiday Master Calendar
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time monthly view of approved CL/PL leaves, pending requests, and Indian gazetted public holidays.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
            className="rounded-xl h-9 w-9 p-0 flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 min-w-[150px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="rounded-xl h-9 w-9 p-0 flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend Badge Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold pt-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Approved Leave</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Pending Approval</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Gazetted Holiday</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
          <span>Weekend Off</span>
        </div>
      </div>

      {/* Grid Header & Days */}
      <div className="border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center py-2.5">
          {dayNames.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-y divide-zinc-200 dark:divide-zinc-800">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Date Inspection Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedDayEvents(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#94cb3d]/20 text-[#94cb3d] flex items-center justify-center font-bold">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                  Date Telemetry: {selectedDayEvents.day} {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <p className="text-xs text-zinc-500">Event Details & Leave Status</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {selectedDayEvents.events.map((ev, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {ev.employee || ev.label}
                    </span>
                    <Badge
                      variant={
                        ev.type === 'approved'
                          ? 'success'
                          : ev.type === 'pending'
                          ? 'brand'
                          : 'secondary'
                      }
                      className="text-[10px] font-bold"
                    >
                      {ev.type.toUpperCase()}
                    </Badge>
                  </div>
                  {ev.leaveType && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      Category: <span className="font-bold">{ev.leaveType}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setSelectedDayEvents(null)}
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl text-xs px-4"
              >
                Close View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
